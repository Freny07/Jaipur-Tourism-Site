package com.jaipur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User newUser) {

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return Map.of("error", "User already exists");
        }

        newUser.setProvider("LOCAL");
        newUser.setPasswordSet(true);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        User savedUser = userRepository.save(newUser);
        savedUser.setPassword(null);

        return Map.of("message", "User registered successfully", "user", savedUser);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {

        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if ("GOOGLE".equals(user.getProvider()) && !user.isPasswordSet()) {
                return Map.of("error", "Please set password first");
            }

            if (user.getPassword() != null && passwordEncoder.matches(password, user.getPassword())) {
                user.setPassword(null);
                return Map.of("message", "Login successful", "user", user);
            }
        }

        return Map.of("error", "Invalid credentials");
    }

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal Object principal) {

        if (principal == null) {
            return Map.of("error", "Not logged in");
        }

        String email = null;
        if (principal instanceof OAuth2User) {
            email = ((OAuth2User) principal).getAttribute("email");
        } else if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            email = (String) principal;
        }

        if (email == null) {
            return Map.of("error", "Principal identification failed");
        }

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User u = user.get();
            u.setPassword(null);
            return Map.of("user", u);
        }

        return Map.of("error", "User not found in database");
    }


    @PostMapping("/set-password")
    public Map<String, Object> setPassword(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            user.setPassword(passwordEncoder.encode(password));
            user.setPasswordSet(true);

            userRepository.save(user);

            return Map.of("message", "Password set successfully");
        }

        return Map.of("error", "User not found");
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return users;
    }

    @PutMapping("/update")
    public Map<String, Object> updateUser(@RequestBody User updateData) {
        if (updateData.getEmail() == null || updateData.getEmail().isEmpty()) {
            return Map.of("error", "Email is required to update profile");
        }

        Optional<User> userOpt = userRepository.findByEmail(updateData.getEmail());

        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();
            
            // Update fields (except email and provider)
            if (updateData.getName() != null) existingUser.setName(updateData.getName());
            if (updateData.getPhone() != null) existingUser.setPhone(updateData.getPhone());
            if (updateData.getAge() != null) existingUser.setAge(updateData.getAge());
            if (updateData.getCity() != null) existingUser.setCity(updateData.getCity());
            if (updateData.getTravelType() != null) existingUser.setTravelType(updateData.getTravelType());
            if (updateData.getInterest() != null) existingUser.setInterest(updateData.getInterest());
            if (updateData.getPhoto() != null) existingUser.setPhoto(updateData.getPhoto());
            
            // Only update password if provided and not empty
            if (updateData.getPassword() != null && !updateData.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updateData.getPassword()));
                existingUser.setPasswordSet(true);
            }

            User savedUser = userRepository.save(existingUser);
            savedUser.setPassword(null);

            return Map.of("message", "Profile updated successfully", "user", savedUser);
        }

        return Map.of("error", "User not found");
    }

    // ─── FORGOT PASSWORD ────────────────────────────────────────────

    @Transactional
    @PostMapping("/forgot-password")
    public Map<String, Object> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        // Always return the same message to avoid user enumeration
        if (email == null || email.isBlank()) {
            return Map.of("message", "If this email is registered, a reset link has been sent.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            // Delete any existing token for this email first
            tokenRepository.deleteByEmail(email);

            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken(token, email);
            tokenRepository.save(resetToken);

            try {
                emailService.sendPasswordResetEmail(email, token);
            } catch (Exception e) {
                return Map.of("error", "Failed to send email. Please try again later.");
            }
        }

        return Map.of("message", "If this email is registered, a reset link has been sent.");
    }

    @Transactional
    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("newPassword");

        if (token == null || newPassword == null || newPassword.length() < 6) {
            return Map.of("error", "Invalid request. Password must be at least 6 characters.");
        }

        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);

        if (tokenOpt.isEmpty()) {
            return Map.of("error", "Invalid or already used reset link.");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            return Map.of("error", "This reset link has expired. Please request a new one.");
        }

        Optional<User> userOpt = userRepository.findByEmail(resetToken.getEmail());
        if (userOpt.isEmpty()) {
            return Map.of("error", "User not found.");
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordSet(true);
        userRepository.save(user);

        // Invalidate the token after use
        tokenRepository.delete(resetToken);

        return Map.of("message", "Password reset successfully! You can now sign in.");
    }
}