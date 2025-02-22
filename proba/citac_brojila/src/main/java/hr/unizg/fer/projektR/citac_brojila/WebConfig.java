package hr.unizg.fer.projektR.citac_brojila;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Dopuštamo pristup svim endpointima
                .allowedOrigins("http://localhost:3000")  // Dopuštamo pristup samo s ove domene
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Dopuštamo ove HTTP metode
                .allowedHeaders("*")  // Dopuštamo sve zaglavlja
                .allowCredentials(true);  // Dopuštamo kolačiće
    }
}
