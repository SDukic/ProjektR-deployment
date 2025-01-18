package hr.unizg.fer.backend.controller;


import hr.unizg.fer.backend.entity.LoginRequest;
import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.websecurity.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hr.unizg.fer.backend.service.RadnikService;

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
            return ResponseEntity.ok(new LoginResponse(token, "admin"));
        }

        // Provjera za radnika
        Optional<Radnik> radnikOpt = radnikService.findRadnikById(Integer.valueOf(loginRequest.getUsername()));
        if (radnikOpt.isPresent()) {
            Radnik radnik = radnikOpt.get();
            if (radnik.getPassword().equals(loginRequest.getPassword())) {
                String token = jwtUtil.generateToken(radnik.getId().toString(), "radnik");
                return ResponseEntity.ok(new LoginResponse(token, "radnik"));
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}


