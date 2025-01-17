package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.service.NalogService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/nalozi")
public class NalogController {
    private final NalogService nalogService;

    public NalogController(NalogService nalogService) {
        this.nalogService = nalogService;
    }

    @GetMapping
    public List<Nalog> getAllNalozi() {
        return nalogService.getAllNaloge();
    }

    @GetMapping("/{idRadnik}")
    public List<Nalog> getNaloziByRadnik(@PathVariable Integer idRadnik) {
        return nalogService.findByRadnikId(idRadnik);
    }
}
