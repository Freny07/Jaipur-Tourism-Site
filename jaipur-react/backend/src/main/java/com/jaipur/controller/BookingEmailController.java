package com.jaipur.controller;

import com.jaipur.dto.BookingRequest;
import com.jaipur.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://35.154.74.197"}, allowCredentials = "true")
public class BookingEmailController {

    @Autowired
    private EmailService emailService;

    // Temporary storage for OTPs. Key: Email, Value: OTP
    private ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @PostMapping("/send-booking-email")
    public ResponseEntity<?> sendEmail(@RequestBody BookingRequest request) {
        try {
            emailService.sendBookingConfirmation(request);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to send email: " + e.getMessage());
        }
    }

    @PostMapping("/send-cancellation-email")
    public ResponseEntity<?> sendCancellationEmail(@RequestBody BookingRequest request) {
        try {
            emailService.sendCancellationConfirmation(request);
            return ResponseEntity.ok("Cancellation email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to send cancellation email: " + e.getMessage());
        }
    }

    @PostMapping("/send-cancellation-otp")
    public ResponseEntity<?> sendCancellationOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null) return ResponseEntity.badRequest().body("Email is required");
            
            String otp = generateOtp();
            otpStorage.put(email, otp);
            
            emailService.sendOtpEmail(email, otp, "Booking Cancellation");
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to send OTP"));
        }
    }

    @PostMapping("/verify-cancellation-otp")
    public ResponseEntity<?> verifyCancellationOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        
        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and OTP are required"));
        }
        
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // OTP used successfully
            return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
    }
}
