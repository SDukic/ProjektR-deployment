package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.DTO.NalogDTO;
import hr.unizg.fer.backend.DTO.RadnikDTO;
import hr.unizg.fer.backend.DTO.StavkaNalogaDTO;
import hr.unizg.fer.backend.entity.*;
import hr.unizg.fer.backend.service.NalogService;
import hr.unizg.fer.backend.service.OcitanjeService;
import hr.unizg.fer.backend.service.RadnikService;
import hr.unizg.fer.backend.service.StavkaNalogaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nalozi")
public class NalogController {
    private final NalogService nalogService;
    private final RadnikService radnikService;
    private final StavkaNalogaService stavkaNalogaService;
    private final OcitanjeService ocitanjeService;

    public NalogController(NalogService nalogService, RadnikService radnikService, StavkaNalogaService stavkaNalogaService, OcitanjeService ocitanjeService) {
        this.nalogService = nalogService;
        this.radnikService = radnikService;
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

    @GetMapping("/radnik/nalog/{idnalog}")
    public RadnikDTO getRadnikByIDNalog(@PathVariable Integer idnalog) {
        NalogDTO nalogDTO = nalogService.getNalogById(idnalog);
        return nalogDTO.getRadnik();
    }

    @PostMapping("/create")
    public Nalog createNalog(@RequestBody Nalog nalog) {
        return nalogService.createNalog(nalog);
    }

    @PutMapping("/update/{id}")
    public Nalog updateNalog(@PathVariable Integer id, @RequestBody Nalog nalog) {
        return nalogService.updateNalog(id, nalog);
    }

    @PutMapping("{idNalog}/dodjeliRadnika/{idRadnik}")
    public ResponseEntity<Nalog> updateNalogRadnik(
            @PathVariable Integer idNalog,
            @PathVariable Integer idRadnik) {
        try {
            Nalog nalog = nalogService.getNalogByIdNalog(idNalog);
            Radnik radnik = radnikService.findRadnikById(idRadnik)
                    .orElseThrow(() -> new RuntimeException("Radnik nije pronađen"));
            nalog.setIdRadnik(radnik);
            Nalog updatedNalog = nalogService.saveNalog(nalog); // Pretpostavlja se da postoji `saveNalog` metoda u servisu
            return ResponseEntity.ok(updatedNalog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public void deleteNalog(@PathVariable Integer id) {
        nalogService.deleteNalog(id);
    }

    @PostMapping("/{nalogId}/addstavka")
    public void addStavkaToNalog(@PathVariable Integer nalogId, @RequestBody StavkaNaloga stavkaNaloga) {
        nalogService.addStavkaToNalog(nalogId, stavkaNaloga);
    }

    @PutMapping("/update/{id}/status")
    public ResponseEntity<Nalog> updateNalogStatus(@PathVariable Integer id, @RequestBody String status) {
        Nalog updatedNalog = nalogService.updateNalogStatus(id, status);
        return ResponseEntity.ok(updatedNalog);
    }
}


