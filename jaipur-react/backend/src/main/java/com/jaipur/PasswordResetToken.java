package com.jaipur;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    public PasswordResetToken() {}

    public PasswordResetToken(String token, String email) {
        this.token = token;
        this.email = email;
        this.expiresAt = LocalDateTime.now().plusHours(1);
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiresAt);
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
