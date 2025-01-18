package hr.unizg.fer.backend.websecurity;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

public interface WebConfig {
    void addCorsMappings(CorsRegistry registry);
}
