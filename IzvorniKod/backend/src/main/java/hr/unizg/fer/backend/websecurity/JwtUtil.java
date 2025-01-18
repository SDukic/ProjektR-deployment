package hr.unizg.fer.backend.websecurity;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "thisisaverysecureandlongsecretkeyfortoken!"; // Konstantni ključ
    private static final SecretKey SECRET_KEY_SPEC = new SecretKeySpec(
            Base64.getEncoder().encode(SECRET_KEY.getBytes()),
            SignatureAlgorithm.HS256.getJcaName()
    );

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600_000)) // 1 sat
                .signWith(SECRET_KEY_SPEC, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY_SPEC)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY_SPEC)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY_SPEC).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false; // Token nije valjan
        }
    }
}
