package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.service.BrojiloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brojila")
public class BrojiloController {
    private final BrojiloService brojiloService;

    public BrojiloController(BrojiloService brojiloService) {
        this.brojiloService = brojiloService;
    }

    @GetMapping
    public List<Brojilo> getAllBrojila() {
        return brojiloService.getAllBrojila();
    }
}
