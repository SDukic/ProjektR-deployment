package hr.unizg.fer.backend.controller;


import hr.unizg.fer.backend.entity.LoginRequest;
import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.websecurity.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hr.unizg.fer.backend.service.RadnikService;

import java.util.List;
import java.util.Optional;




@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RadnikService radnikService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Provjera za admina
        if ("admin".equals(loginRequest.getUsername()) && "admin".equals(loginRequest.getPassword())) {
            String token = jwtUtil.generateToken("admin", "admin");

            // Postavljanje autentifikacije za admina
            setAuthentication("admin", "ROLE_ADMIN");
            return ResponseEntity.ok(new LoginResponse(token, "admin"));
        }

        // Provjera za radnika
        Optional<Radnik> radnikOpt = radnikService.findRadnikById(Integer.valueOf(loginRequest.getUsername()));
        if (radnikOpt.isPresent()) {
            Radnik radnik = radnikOpt.get();
            if (radnik.getPassword().equals(loginRequest.getPassword())) {
                String token = jwtUtil.generateToken(radnik.getId().toString(), "radnik");

                // Postavljanje autentifikacije za radnika
                setAuthentication(radnik.getId().toString(), "ROLE_RADNIK");
                return ResponseEntity.ok(new LoginResponse(token, "radnik"));
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    private void setAuthentication(String username, String role) {
        // Kreiraj SimpleGrantedAuthority za korisnikovu ulogu
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

        // Kreiraj Authentication objekt (koristi se UsernamePasswordAuthenticationToken)
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);

        // Postavi Authentication u SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}


