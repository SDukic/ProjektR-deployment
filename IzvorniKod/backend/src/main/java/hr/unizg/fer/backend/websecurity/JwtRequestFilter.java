package hr.unizg.fer.backend.websecurity;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Utility klasa za obradu JWT tokena

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        // Dohvat Authorization zaglavlja iz HTTP zahtjeva
        final String authorizationHeader = request.getHeader("Authorization");

        // Provjera postoji li Authorization zaglavlje i započinje li s "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Uklanjanje "Bearer " prefiksa

            try {
                // Ekstrakcija uloge i korisničkog ID-a iz tokena pomoću JwtUtil
                String role = jwtUtil.extractRole(token);
                String username = jwtUtil.extractUsername(token);

                System.out.println("Extracted Role: " + role); // Dijagnostički log
                System.out.println("Extracted Username: " + username);

                // Postavljanje autentifikacije u SecurityContext
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(role))
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // U slučaju greške u tokenu, šaljemo HTTP 401 odgovor
                System.err.println("Invalid JWT token: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
                return; // Prekidamo filter lanac ako je token neispravan
            }
        }

        // Prosljeđujemo zahtjev dalje kroz lanac filtera
        chain.doFilter(request, response);
    }
}
