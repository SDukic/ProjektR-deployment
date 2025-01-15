package hr.unizg.fer.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value("${frontend.url}") // Učitavanje URL-a iz application.properties
    private String frontendUrl;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Omogućava CORS za sve endpointove
                        .allowedOrigins(frontendUrl) // React frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozvoljeni HTTP metodi
                        .allowedHeaders("*") // Dozvoljeni headeri
                        .allowCredentials(true); // Omogućava slanje kolačića ili autentifikacije
            }
        };
    }
}