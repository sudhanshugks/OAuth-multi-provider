package com.example.my.proj.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class AuthController {

    @GetMapping("/user")
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of("error", "Not authenticated");
        }
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", principal.getAttribute("name"));
        userInfo.put("email", principal.getAttribute("email"));
        userInfo.put("avatar", principal.getAttribute("avatar_url") != null
                ? principal.getAttribute("avatar_url")
                : principal.getAttribute("picture"));
        userInfo.put("login", principal.getAttribute("login")); // GitHub username
        return userInfo;
    }

    @GetMapping("/public/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "message", "Backend is running!");
    }

    @PostMapping("/logout")
    public Map<String, String> logout() {
        return Map.of("message", "Logged out successfully");
    }
}