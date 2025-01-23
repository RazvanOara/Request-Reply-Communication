package com.example.demo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String secretKey = "jkhgaejrygfrjeghkryjegfyerjgvkyergfvyagfkwagfvyaewfvkefykru";

    public String generateToken(String name) {
        return Jwts.builder()
                .setSubject(name) // Set the name as the subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    

    // Validate a JWT token
    public boolean validateToken(String token, String name) {
        String tokenName = extractName(token);
        return name.equals(tokenName) && !isTokenExpired(token);
    }

    // Extract name (subject) from token
    public String extractName(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extract all claims from the token
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
