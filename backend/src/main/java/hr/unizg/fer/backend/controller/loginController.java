package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.repository.RadnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")

public class loginController {
    @Autowired
    private RadnikRepository radnikRepository;

    @PostMapping
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        // Traženje radnika po telefonu i šifri
        Radnik radnik = radnikRepository.findByTelefonAndSifra(
                loginRequest.getTelefon(),
                loginRequest.getSifra()
        );

        if (radnik != null) {
            // Kreiraj odgovor s podacima koje želiš poslati
            Map<String, String> response = new HashMap<>();
            response.put("id", radnik.getId().toString());
            response.put("ime", radnik.getIme());
            response.put("prezime", radnik.getPrezime());
            response.put("telefon", radnik.getTelefon());

            return ResponseEntity.ok(response); // Automatski se serijalizira u JSON
        } else {
            // Vraćanje greške s JSON tijelom
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Neispravni podaci za prijavu.");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(errorResponse);  // Explicitan tip Map<String, String>
        }
    }


    // DTO klasa za primanje login podataka
    public static class LoginRequest {
        private String telefon;
        private String sifra;

        public String getTelefon() {
            return telefon;
        }

        public void setTelefon(String telefon) {
            this.telefon = telefon;
        }

        public String getSifra() {
            return sifra;
        }

        public void setSifra(String sifra) {
            this.sifra = sifra;
        }
    }
}
