package com.jaipur;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final ClientRegistrationRepository clientRegistrationRepository;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, ClientRegistrationRepository clientRegistrationRepository) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/signup", "/api/login", "/api/set-password", "/api/me", "/api/chat", "/api/update", "/api/forgot-password", "/api/reset-password").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .authorizationEndpoint(authorization -> authorization
                    .authorizationRequestResolver(authorizationRequestResolver())
                )
                .defaultSuccessUrl("/profile", true)
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
            );


        return http.build();
    }

    private OAuth2AuthorizationRequestResolver authorizationRequestResolver() {
        DefaultOAuth2AuthorizationRequestResolver resolver = new DefaultOAuth2AuthorizationRequestResolver(
                clientRegistrationRepository, "/oauth2/authorization");
        
        resolver.setAuthorizationRequestCustomizer(customizer -> customizer
            .additionalParameters(params -> {
                params.put("prompt", "select_account");
                // Optional: params.put("access_type", "offline"); 
            })
        );
        
        return resolver;
    }



    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174", "http://35.154.74.197"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}