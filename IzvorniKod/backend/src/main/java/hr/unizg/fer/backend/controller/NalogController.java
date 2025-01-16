package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.DTO.NalogDTO;
import hr.unizg.fer.backend.DTO.OcitanjeDTO;
import hr.unizg.fer.backend.entity.*;
import hr.unizg.fer.backend.repository.NalogRepository;
import hr.unizg.fer.backend.service.NalogService;
import hr.unizg.fer.backend.service.OcitanjeService;
import hr.unizg.fer.backend.service.StavkaNalogaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nalozi")
public class NalogController {
    private final NalogService nalogService;
    private final StavkaNalogaService stavkaNalogaService;
    private final OcitanjeService ocitanjeService;

    public NalogController(NalogService nalogService, StavkaNalogaService stavkaNalogaService, OcitanjeService ocitanjeService){
        this.nalogService = nalogService;
        this.stavkaNalogaService = stavkaNalogaService;
        this.ocitanjeService = ocitanjeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<NalogDTO>> getAllNalogs() {
        List<NalogDTO> nalozi = nalogService.getAllNalozi();
        return ResponseEntity.ok(nalozi);
    }

    @GetMapping("/{nalogId}")
    public ResponseEntity<NalogDTO> getNalogById(@PathVariable Integer nalogId) {
        NalogDTO nalogDTO = nalogService.getNalogById(nalogId);
        return ResponseEntity.ok(nalogDTO);
    }

    @GetMapping("/radnik/{radnikId}")
    public ResponseEntity<List<NalogDTO>> getAllNaloziByRadnikId(@PathVariable Radnik radnikId) {
        List<NalogDTO> nalozi = nalogService.getAllNaloziByRadnikId(radnikId);
        return ResponseEntity.ok(nalozi);
    }

    @PostMapping("/create")
    public Nalog createNalog(@RequestBody Nalog nalog) {
        return nalogService.createNalog(nalog);
    }

    @PutMapping("/update/{id}")
    public Nalog updateNalog(@PathVariable Integer id, @RequestBody Nalog nalog) {
        return nalogService.updateNalog(id, nalog);
    }

        @DeleteMapping("/delete/{id}")
        public void deleteNalog(@PathVariable Integer id) {
            nalogService.deleteNalog(id);
        }

    @PostMapping("/{nalogId}/addstavka")
    public void addStavkaToNalog(@PathVariable Integer nalogId, @RequestBody StavkaNaloga stavkaNaloga) {
        nalogService.addStavkaToNalog(nalogId, stavkaNaloga);
    }
}
