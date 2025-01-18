package hr.unizg.fer.backend.websecurity;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.util.Base64;

@Configuration
public class JwtConfig {

    private final SecretKey secretKey;

    public JwtConfig() {
        // Generiraj siguran ključ za HS256
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public SecretKey getSecretKey() {
        return secretKey;
    }

    public String getBase64EncodedKey() {
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }
}
