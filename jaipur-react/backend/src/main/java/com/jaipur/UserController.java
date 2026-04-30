package com.jaipur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User newUser) {

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return Map.of("error", "User already exists");
        }

        newUser.setProvider("LOCAL");
        newUser.setPasswordSet(true);

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

            if (user.getPassword() != null && user.getPassword().equals(password)) {
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

            user.setPassword(password);
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
}