package com.jaipur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

```
@Autowired
private UserRepository userRepository;

// Signup
@PostMapping("/signup")
public Map<String, Object> signup(@RequestBody User newUser) {
    if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
        return Map.of("error", "User already exists");
    }

    User savedUser = userRepository.save(newUser);
    savedUser.setPassword(null);

    return Map.of(
        "message", "User registered successfully",
        "user", savedUser
    );
}

// Login
@PostMapping("/login")
public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    Optional<User> user = userRepository.findByEmailAndPassword(email, password);

    if (user.isPresent()) {
        User u = user.get();
        u.setPassword(null);

        return Map.of(
            "message", "Login successful",
            "user", u
        );
    } else {
        return Map.of("error", "Invalid credentials");
    }
}

// Get all users
@GetMapping("/users")
public List<User> getUsers() {
    List<User> users = userRepository.findAll();
    users.forEach(u -> u.setPassword(null));
    return users;
}

// Update profile
@PutMapping("/update")
public Map<String, Object> update(@RequestBody User updatedUser) {

    Optional<User> existingUser = userRepository.findByEmail(updatedUser.getEmail());

    if (existingUser.isPresent()) {
        User user = existingUser.get();

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setAge(updatedUser.getAge());
        user.setCity(updatedUser.getCity());
        user.setTravelType(updatedUser.getTravelType());
        user.setInterest(updatedUser.getInterest());
        user.setPhoto(updatedUser.getPhoto());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(updatedUser.getPassword());
        }

        User saved = userRepository.save(user);
        saved.setPassword(null);

        return Map.of(
            "message", "Profile updated successfully",
            "user", saved
        );
    } else {
        return Map.of("error", "User not found");
    }
}
```

}
