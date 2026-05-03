package com.jaipur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Reset Your Jaipur Tourism Password");
        message.setText(
            "Namaste! 🙏\n\n" +
            "We received a request to reset your password for Jaipur Tourism.\n\n" +
            "Click the link below to set a new password (valid for 1 hour):\n\n" +
            resetLink + "\n\n" +
            "If you did not request this, please ignore this email — your password will remain unchanged.\n\n" +
            "— The Jaipur Tourism Team"
        );

        mailSender.send(message);
    }
}
