package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.service.BrojiloService;
import hr.unizg.fer.backend.DTO.BrojiloDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brojila")
public class BrojiloController {
    private final BrojiloService brojiloService;

    public BrojiloController(BrojiloService brojiloService) {
        this.brojiloService = brojiloService;
    }

    @GetMapping("/all")
    public List<BrojiloDTO> getAllBrojila() {
        return brojiloService.allBrojila();
    }

    @PostMapping("/create")
    public BrojiloDTO createBrojilo(@RequestBody Brojilo brojilo) {
        return brojiloService.createBrojilo(brojilo);
    }

    @PutMapping("/update/{id}")
    public BrojiloDTO updateBrojilo(@PathVariable Integer id, @RequestBody Brojilo brojilo) {
        return brojiloService.updateBrojilo(id, brojilo);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBrojilo(@PathVariable Integer id) {
        brojiloService.deleteBrojilo(id);
    }
}
