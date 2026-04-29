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
        "Pages available: Home, Attractions (/attractions), Shopping (/shopping), Cuisine (/cuisine), Packages & Contact (/contact).\n" +
        "To book a tour or contact us: visit the /contact page.\n\n" +

        "=== ABOUT JAIPUR ===\n" +
        "Jaipur is the capital of Rajasthan, India, famously called the Pink City due to its distinct pink-coloured buildings.\n" +
        "Founded in 1727 by Maharaja Sawai Jai Singh II — India's first planned city.\n" +
        "Jaipur is part of the Golden Triangle tourist circuit along with Delhi and Agra.\n" +
        "Best time to visit: October to March (pleasant weather). Summers (April–June) are very hot.\n\n" +

        "=== ATTRACTIONS (/attractions) ===\n" +
        "The site lists 32 attractions total. Here are the 6 featured ones:\n" +
        "FORTS & PALACES:\n" +
        "- Amber Fort: Majestic hilltop fort with elephant rides, light & sound show at 7 PM, stunning views of Maota Lake.\n" +
        "- Hawa Mahal: 'Palace of Winds' with 953 intricately carved windows, built for royal ladies to view street processions.\n" +
        "- City Palace: Royal residence complex with courtyards, museums, and the famous Peacock Gate.\n" +
        "SCIENCE & HERITAGE:\n" +
        "- Jantar Mantar: UNESCO World Heritage astronomical observatory with the world's largest stone sundial.\n" +
        "- Albert Hall Museum: Collection of paintings, carpets, ivory, stone, and metal sculptures.\n" +
        "- Birla Mandir: Modern white marble temple, beautifully lit in the evening.\n" +
        "Visit Tip: Most attractions open morning to evening. Book tickets online to avoid queues. Carry water, wear comfortable footwear.\n\n" +

        "=== SHOPPING (/shopping) ===\n" +
        "4 popular markets featured:\n" +
        "- Johari Bazaar: Best for gold, kundan, and meenakari jewellery. Ideal for wedding shopping.\n" +
        "- Bapu Bazaar: Great for mojris (shoes), bandhej sarees, kurtis, and Jaipuri quilts.\n" +
        "- Pink City Market: Traditional Rajasthani attire, handicrafts, puppets, and decorative items.\n" +
        "- Tripolia Bazaar: Known for lac bangles, brassware, and premium textiles at wholesale prices.\n" +
        "Shopping Tips: Bargaining is common — start low. Use government emporiums for gems. Keep cash for small shops. Shop in the evening in summer — afternoons are very hot.\n\n" +

        "=== CUISINE (/cuisine) ===\n" +
        "4 signature dishes to try:\n" +
        "- Rajasthani Thali: A royal platter with dal-baati-churma, gatte ki sabzi, kadhi, roti, rice, and sweets. Must-try!\n" +
        "- Ghewar: Honeycomb-like sweet cake, especially popular during the Teej festival and monsoon season.\n" +
        "- Pyaz Kachori: Crispy pastry stuffed with spicy onion filling — a classic Jaipur breakfast snack.\n" +
        "- Laal Maas: Fiery red mutton curry slow-cooked with Mathania chillies and traditional spices (very spicy!).\n" +
        "Where to Eat: Try local dhabas and rooftop restaurants in the old city. Thali restaurants near MI Road and C-Scheme serve unlimited Rajasthani thalis. For street food, explore near Bapu Bazaar and Johari Bazaar in the evening.\n\n" +

        "=== PACKAGES & BOOKING (/contact) ===\n" +
        "3 tourism packages available:\n" +
        "- Package 1: Jaipur One-Day Tour\n" +
        "- Package 2: 2 Days Heritage Tour\n" +
        "- Package 3: 3 Days Jaipur–Ajmer–Pushkar Tour\n" +
        "To register: Fill the form on /contact with your Name, Email, Phone, and selected Package.\n\n" +

        "=== CONTACT INFORMATION ===\n" +
        "Address: Jaipur Tourism Office, Pink City, Jaipur, Rajasthan\n" +
        "Email: info@jaipurtourism.com\n" +
        "Phone: +91-12345-67890\n" +
        "Office Hours: 9:00 AM to 7:00 PM, all days.\n\n" +

        "=== TODAY'S FEATURED EVENTS ===\n" +
        "- Light & Sound Show at Amber Fort — 7:00 PM\n" +
        "- Folk Dance Night at Central Park — 8:30 PM\n" +
        "- Artisan Market at Johari Bazaar — All Day\n" +
        "- Rajasthani Food Fest at Bapu Bazaar — 5:00 PM\n\n" +

        "=== USER PROFILE SYSTEM ===\n" +
        "To create a profile: Click the person icon in the top navigation bar.\n" +
        "Fill in name, email, phone, age, city, travel type (Solo/Family/Friends/Couple), and interest (Culture/Food/Adventure/Shopping/Heritage). You can also upload a profile photo.\n" +
        "Profile is saved in your browser. You can edit or logout at any time.\n\n" +

        "=== WEATHER INFO ===\n" +
        "The website shows live weather for Jaipur on the Home page, updated every 15 minutes.\n" +
        "General climate: Hot summers (up to 45C), monsoon (July–September), pleasant winter (October–February, 10–20C). Best tourist season: October–March.";

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=" + geminiApiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();

        String combinedSystemPrompt = demoSystemPrompt + knowledgeBase;

        // System Instruction — hidden from user, prevents AI from repeating the prompt
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
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> partsList = (List<Map<String, Object>>) contentMap.get("parts");
            String botText = (String) partsList.get(0).get("text");

            Map<String, String> result = new HashMap<>();
            result.put("reply", botText);
            return result;
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("reply", "API Error: " + e.getResponseBodyAsString());
            return error;
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("reply", "Sorry, I am having trouble connecting right now. Please try again!");
            return error;
        }
    }
}
