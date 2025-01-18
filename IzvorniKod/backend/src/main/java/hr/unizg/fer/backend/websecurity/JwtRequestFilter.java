package hr.unizg.fer.backend.websecurity;



import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // JWT utiliteta za obradu tokena


    @Override

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            try {
                // Pokušavamo izvući ulogu iz tokena
                String role = jwtUtil.extractRole(token);
                System.out.println("Extracted Role: " + role); // Log za dijagnostiku
            } catch (Exception e) {
                // Ako je token neispravan, vraćamo HTTP 401 odgovor
                System.err.println("Invalid JWT token: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
                return; // Prekidamo filter lanac
            }
        }

        // Prosljeđujemo zahtjev dalje u lancu filtera
        chain.doFilter(request, response);
    }



}
