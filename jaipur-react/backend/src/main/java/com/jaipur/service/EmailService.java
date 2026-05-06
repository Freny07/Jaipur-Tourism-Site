package com.jaipur.service;

import com.jaipur.dto.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(BookingRequest request) {
        String startDateFormatted = request.getStartDate();
        try {
            // Try to parse ISO date to simple string
            Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX").parse(request.getStartDate());
            startDateFormatted = new SimpleDateFormat("dd/MM/yyyy").format(date);
        } catch (Exception e) {
            // ignore and use raw
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());
        message.setSubject("Booking Confirmation: " + request.getPackageName());
        
        String body = "Dear " + request.getName() + ",\n\n"
                    + "Thank you for choosing Jaipur Tourism! Your payment was successful and your booking is confirmed.\n\n"
                    + "Package Details:\n"
                    + "Package: " + request.getPackageName() + "\n"
                    + "Start Date: " + startDateFormatted + "\n\n"
                    + "We look forward to hosting you in the Pink City.\n\n"
                    + "Best Regards,\nJaipur Tourism Team";
                    
        message.setText(body);
        
        mailSender.send(message);
    }

    public void sendCancellationConfirmation(BookingRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getEmail());
        message.setSubject("Booking Cancellation: " + request.getPackageName());
        
        String body = "Dear " + request.getName() + ",\n\n"
                    + "This email is to confirm that your booking for the '" + request.getPackageName() + "' package has been successfully canceled.\n\n"
                    + "If you canceled this by mistake, or if you'd like to book another package, please visit our website again.\n\n"
                    + "Best Regards,\nJaipur Tourism Team";
                    
        message.setText(body);
        
        mailSender.send(message);
    }

    public void sendWelcomeEmail(String email, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Welcome to Jaipur Tourism!");
        
        String body = "Dear " + name + ",\n\n"
                    + "Thank you for registering with Jaipur Tourism! We are thrilled to have you on board.\n\n"
                    + "You can now explore our exclusive packages, discover the rich heritage of the Pink City, and book your upcoming trips seamlessly.\n\n"
                    + "Best Regards,\nJaipur Tourism Team";
                    
        message.setText(body);
        
        mailSender.send(message);
    }

    public void sendOtpEmail(String email, String otp, String context) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(context + " OTP - Jaipur Tourism");
        
        String body = "Hello,\n\n"
                    + "Your One-Time Password (OTP) for " + context + " is: " + otp + "\n\n"
                    + "Please enter this code to proceed. This OTP is valid for a short duration.\n\n"
                    + "If you didn't request this, please ignore this email.\n\n"
                    + "Best Regards,\nJaipur Tourism Team";
                    
        message.setText(body);
        
        mailSender.send(message);
    }
}
