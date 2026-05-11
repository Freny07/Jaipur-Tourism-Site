package com.jaipur;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChatController {

    @Value("${gemini.api.key:YOUR_API_KEY_HERE}")
    private String geminiApiKey;

    // === SYSTEM RULES (Persona & Behavior) ===
    private String demoSystemPrompt =
        "You are the official Jaipur Virtual Guide for our tourism website. " +
        "You have a warm, royal, and vibrant 'Pink City' personality. Speak with a hint of Rajasthani hospitality.\n" +
        "IMPORTANT: Do NOT say 'Namaste' in every single reply. Only use it if the user says hello or greets you first.\n" +
        "You MUST keep every single answer strictly under 2 or 3 short sentences. Never output long paragraphs.\n" +
        "When guiding users to other pages (/attractions, /cuisine, /shopping, /contact), be creative! Instead of robotic phrases like 'Please visit /attractions', use engaging phrases like 'To uncover more royal marvels, wander over to our /attractions page!' or 'Savor the full royal menu on our /cuisine page.'\n" +
        "If you don't know something, politely invite them to contact us at /contact or call +91-12345-67890.\n\n" +
        "=== KNOWLEDGE BASE ===\n";

    // === KNOWLEDGE BASE (Tourist-facing facts only) ===
    private String knowledgeBase =
        "=== ABOUT THIS WEBSITE ===\n" +
        "Website: Jaipur City Tourism — 'The Pink City – Heritage, Colors, Culture, Wonders & More'\n" +
        "Navigation: Home, Attractions (/attractions), Shopping (/shopping), Cuisine (/cuisine), Packages & Contact (/contact).\n" +
        "Interactive Features:\n" +
        "- Live Weather: Check real-time Jaipur weather on the Home page (updated every 15 mins).\n" +
        "- Interactive Travel Map: Explore tourist locations visually on the Home and Explorer pages.\n" +
        "- User Profile System: Click the person icon in the nav to create a profile (Solo/Family/Couple) and track bookings.\n" +
        "- Real-time Statistics: Site displays active tourist counts (28,500+ monthly) and total attraction counts (32).\n\n" +

        "=== ATTRACTIONS (/attractions) ===\n" +
        "Jaipur features 32 major heritage sites categorized for explorers:\n" +
        "FORTS & PALACES: Amber Fort (₹500 F / ₹100 I, 4.8★), City Palace (₹700 F / ₹300 I), Hawa Mahal (₹200 F / ₹50 I), Jaigarh Fort (World's largest cannon), Jal Mahal (Water Palace), Nahargarh Fort (Overlooking city).\n" +
        "GATES (Free Entry): Patrika Gate (Vibrant photo spot), Tripolia Gate, Ajmeri Gate, Sanganeri Gate, Chandpole Gate.\n" +
        "TEMPLES: Akshardham (Stunning architecture), Govind Dev Ji (Sacred Krishna temple), Birla Mandir, Galtaji (Monkey temple), Moti Dungri Ganesh.\n" +
        "SCIENCE & HERITAGE: Jantar Mantar (UNESCO Observatory, largest stone sundial), Panna Meena ka Kund (Stepwell), Jawahar Kala Kendra.\n" +
        "MUSEUMS: Albert Hall (₹300 F / ₹40 I), Amrapali Museum (Jewellery), Anokhi Museum (Hand Printing), Wax Museum (Nahargarh).\n" +
        "GARDENS: Central Park, Kanak Vrindavan, Sisodia Rani Garden (tier gardens with fountains).\n" +
        "Visitor Note: Most sites open 9 AM – 6 PM. Carry water, wear comfortable shoes, and book online to skip lines.\n\n" +

        "=== SHOPPING (/shopping) ===\n" +
        "Markets & Specialty Shops:\n" +
        "- Johari Bazaar: Famous for precious gemstones, gold, and Kundan jewellery. Timing: 10 AM - 8 PM.\n" +
        "- Bapu Bazaar: Best for leather mojris, bandhej suits, and Jaipuri quilts. Timing: 11 AM - 9 PM.\n" +
        "- Tripolia Bazaar: Known for lac bangles and traditional brassware. (Closed on Sundays).\n" +
        "- Chandpole Bazaar: Famous for marble sculptures and stone carvings.\n" +
        "- Specialty Stops: The Gem Palace (Antique jewellery), Anokhi (Hand block prints), Kripal Kumbh (Blue Pottery).\n" +
        "Shopping Tips: Bargaining is common in street markets (aim for 30-40% lower). Large stores accept cards/UPI; carry cash for street vendors. Best vibes are in the Evening (5 PM - 9 PM).\n\n" +

        "=== CUISINE (/cuisine) ===\n" +
        "Must-Try Rajasthani Dishes:\n" +
        "- Main Course: Rajasthani Thali (Unlimited platter), Dal-Baati-Churma (The iconic trio), Laal Maas (Spicy red mutton), Gatte ki Sabzi, Ker Sangri.\n" +
        "- Snacks: Pyaz Kachori (Best at Rawat Mishthan Bhandar), Mirchi Bada, Aloo Tikki (Masala Chowk).\n" +
        "- Sweets: Ghewar (Monsoon specialty), Mawa Kachori, Feeni, Jalebi (Saras Parlour).\n" +
        "- Beverages: Kulhad Lassi (Lassiwala, MI Road), Jaljeera, Thandai (Pandit Kulfi).\n" +
        "Top Eateries: LMB (Johari Bazaar), Chokhi Dhani (Village experience), Tapri Central (Rooftop cafe), Spice Court.\n\n" +

        "=== PACKAGES & BOOKING (/contact) ===\n" +
        "Exclusive Tour Packages:\n" +
        "- Amber Fort Heritage Tour: Full Day, ₹1,500/person.\n" +
        "- Royal Palace Tour: Half Day, ₹1,200/person.\n" +
        "- Cultural Night Safari: Evening (Nahargarh), ₹2,000/person (Includes dinner).\n" +
        "- Custom Packages: Users can 'Build Your Custom Package' by selecting specific sites (Amber Fort, Hawa Mahal, Jantar Mantar, etc.) with automated price calculation.\n" +
        "To Book: Use the form on /contact. Payments are secure, and cancellations can be managed via an OTP-verified email system.\n\n" +

        "=== CONTACT & SUPPORT ===\n" +
        "Address: Jaipur Tourism Center, Pink City, Jaipur.\n" +
        "Email: jaipur.tourism.official@gmail.com\n" +
        "Phone: +91-12345-67890 (9 AM - 7 PM).\n" +
        "Socials: Active on Instagram (@jaipur_tour_updates), Facebook, and X.";

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=" + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();

        String combinedSystemPrompt = demoSystemPrompt + knowledgeBase;

        // System Instruction
        Map<String, Object> systemInstruction = new HashMap<>();
        Map<String, Object> systemPart = new HashMap<>();
        systemPart.put("text", combinedSystemPrompt);
        systemInstruction.put("parts", new Object[]{systemPart});
        requestBody.put("system_instruction", systemInstruction);

        // User Message
        Map<String, Object> userPart = new HashMap<>();
        userPart.put("text", userMessage);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", new Object[]{userPart});

        requestBody.put("contents", new Object[]{content});

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            System.out.println("Sending request to Gemini API...");
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            System.out.println("Received response: " + responseBody);

            if (responseBody == null || !responseBody.containsKey("candidates")) {
                throw new RuntimeException("No candidates in response");
            }

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates.isEmpty()) {
                throw new RuntimeException("Candidates list is empty");
            }

            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> partsList = (List<Map<String, Object>>) contentMap.get("parts");
            String botText = (String) partsList.get(0).get("text");

            Map<String, String> result = new HashMap<>();
            result.put("reply", botText);
            return result;
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("Gemini API Error: " + e.getResponseBodyAsString());
            Map<String, String> error = new HashMap<>();
            error.put("reply", "API Error: " + e.getResponseBodyAsString());
            return error;
        } catch (Exception e) {
            System.err.println("Chatbot Internal Error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("reply", "Sorry, I am having trouble connecting to the AI. Error: " + e.getMessage());
            return error;
        }
    }
}
