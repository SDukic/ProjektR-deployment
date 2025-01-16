package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.DTO.OcitanjeDTO;
import hr.unizg.fer.backend.DTO.StavkaNalogaDTO;
import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.entity.StavkaNaloga;
import hr.unizg.fer.backend.service.BrojiloService;
import hr.unizg.fer.backend.service.NalogService;
import hr.unizg.fer.backend.service.OcitanjeService;
import hr.unizg.fer.backend.service.StavkaNalogaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stavkenaloga")
public class StavkaNalogaController {
    private final StavkaNalogaService stavkaNalogaService;
    private final OcitanjeService ocitanjeService;
    private final NalogService nalogService;
    private final BrojiloService brojiloService;

    public StavkaNalogaController(StavkaNalogaService stavkaNalogaService, OcitanjeService ocitanjeService, NalogService nalogService, BrojiloService brojiloService){
        this.stavkaNalogaService = stavkaNalogaService;
        this.ocitanjeService = ocitanjeService;
        this.nalogService = nalogService;
        this.brojiloService = brojiloService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<StavkaNalogaDTO>> getAllStavkeNaloga() {
        List<StavkaNalogaDTO> stavkeNaloga = stavkaNalogaService.allStavkeNaloga();
        return ResponseEntity.ok(stavkeNaloga);
    }

    @GetMapping("/{stavkaId}")
    public ResponseEntity<StavkaNalogaDTO> getStavkaNalogabyId(@PathVariable Integer stavkaId) {
        StavkaNalogaDTO stavkaNalogaDTO = stavkaNalogaService.getStavkaNalogaDTOById(stavkaId);
        return ResponseEntity.ok(stavkaNalogaDTO);
    }

    @PostMapping("/{stavkaId}/ocitanja")
    public ResponseEntity<OcitanjeDTO> createOcitanje(
            @PathVariable Integer stavkaId,
            @RequestBody OcitanjeDTO ocitanjeDTO) {

        // Pronađi stavku naloga prema ID-u
        StavkaNaloga stavkaNaloga = stavkaNalogaService.getStavkaNalogaById(stavkaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stavka naloga nije pronađena"));

        // Mapiraj DTO na entitet
        Ocitanje ocitanje = new Ocitanje();
        ocitanje.setDatumOcitavanja(ocitanjeDTO.getDatumOcitavanja());
        ocitanje.setTarifaVisoka(ocitanjeDTO.getTarifaVisoka());
        ocitanje.setTarifaNiska(ocitanjeDTO.getTarifaNiska());
        ocitanje.setKomentar(ocitanjeDTO.getKomentar());
        ocitanje.setIdStavkaNaloga(stavkaNaloga); // Poveži očitanje sa stavkom naloga

        // Spremi očitanje u bazu
        Ocitanje savedOcitanje = ocitanjeService.createOcitanje(ocitanje);

        // Mapiraj spremljeni entitet natrag u DTO i vrati ga kao odgovor
        OcitanjeDTO savedOcitanjeDTO = new OcitanjeDTO(savedOcitanje);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedOcitanjeDTO);
    }

    @PostMapping("/create")
    public StavkaNaloga createStavkaNaloga(@RequestBody Map<String, Object> payload) {
        Integer nalogId = (Integer) payload.get("idNalog");
        Integer brojiloId = (Integer) payload.get("idBrojilo");

        Nalog nalog = nalogService.getNalogByIdNalog(nalogId);

        Optional<Brojilo> brojiloOpt= brojiloService.findBrojiloById(brojiloId);
        Brojilo brojilo = brojiloOpt.get();

        StavkaNaloga stavkaNaloga = new StavkaNaloga();
        stavkaNaloga.setIdNalog(nalog);
        stavkaNaloga.setIdBrojilo(brojilo);

        return stavkaNalogaService.createStavkaNaloga(stavkaNaloga);
    }


    @PutMapping("/update/{id}")
    public StavkaNaloga updateStavkaNaloga(@PathVariable Integer id, @RequestBody StavkaNaloga stavkaNaloga) {
        return stavkaNalogaService.updateStavkaNaloga(id, stavkaNaloga);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStavkaNaloga(@PathVariable Integer id) {
        stavkaNalogaService.deleteStavkaNaloga(id);
    }
}
