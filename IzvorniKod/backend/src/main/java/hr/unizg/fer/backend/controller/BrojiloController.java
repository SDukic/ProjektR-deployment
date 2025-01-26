package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.DTO.StavkaNalogaDTO;
import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.service.BrojiloService;
import hr.unizg.fer.backend.service.OcitanjeService;
import hr.unizg.fer.backend.DTO.BrojiloDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brojila")
public class BrojiloController {
    private final BrojiloService brojiloService;
    private final OcitanjeService ocitanjeService;

    public BrojiloController(BrojiloService brojiloService, OcitanjeService ocitanjeService) {
        this.brojiloService = brojiloService;
        this.ocitanjeService = ocitanjeService;
    }

    @GetMapping("/all")
    public List<BrojiloDTO> getAllBrojila() {
        return brojiloService.allBrojila();
    }

    @PostMapping("/create")
    public BrojiloDTO createBrojilo(@RequestBody BrojiloDTO brojiloDTO) {
        return brojiloService.createBrojilo(brojiloDTO);
    }

    @PutMapping("/update/{id}")
    public BrojiloDTO updateBrojilo(@PathVariable Integer id, @RequestBody Brojilo brojilo) {
        return brojiloService.updateBrojilo(id, brojilo);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBrojilo(@PathVariable Integer id) {
        brojiloService.deleteBrojilo(id);
    }

    @GetMapping("/{brojiloId}/stavkenaloga")
    public ResponseEntity<List<StavkaNalogaDTO>> getStavkeNalogaByBrojiloId(@PathVariable Integer brojiloId) {
        try {
            List<StavkaNalogaDTO> stavkeNaloga = brojiloService.getStavkeNalogaByBrojiloId(brojiloId);
            return ResponseEntity.ok(stavkeNaloga);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
