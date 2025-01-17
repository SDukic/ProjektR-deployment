package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.service.RadnikService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/radnici")
public class RadnikController {
    private final RadnikService radnikService;

    public RadnikController(RadnikService radnikService) {
        this.radnikService = radnikService;
    }

    @GetMapping
    public List<Radnik> getAllRadnici() {
        return radnikService.getAllRadnici();
    }
}
