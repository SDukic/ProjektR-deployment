package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.service.OcitanjeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ocitanja")
public class OcitanjeController {
    private final OcitanjeService ocitanjeService;

    public OcitanjeController(OcitanjeService ocitanjeService) {
        this.ocitanjeService = ocitanjeService;
    }

    @GetMapping
    public List<Ocitanje> getAllOcitanja() {
        return ocitanjeService.getAllOcitanja();
    }
}
