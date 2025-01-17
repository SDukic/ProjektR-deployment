package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.service.RadnikService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/radnici")
public class RadnikController {
    private final RadnikService radnikService;

    public RadnikController(RadnikService radnikService){
        this.radnikService = radnikService;
    }

    @GetMapping("/all")
    public List<Radnik> getAllRadnici(){
        return radnikService.allRadnici();
    }

    @GetMapping("/{idradnik}")
    public Radnik getRadnici(@PathVariable int idradnik){
        Radnik radnik = radnikService.findRadnikById(idradnik)
                .orElseThrow(() -> new EntityNotFoundException("Radnik with ID " + idradnik + " not found"));

        return radnik;
    }

    @PostMapping("/create")
    public Radnik createRadnik(@RequestBody Radnik radnik){
        return radnikService.createRadnik(radnik);
    }

    @PutMapping("/update/{id}")
    public Radnik updateRadnik(@PathVariable Integer id, @RequestBody Radnik radnik) {
        return radnikService.updateRadnik(id, radnik);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRadnik(@PathVariable Integer id) {
        radnikService.deleteRadnik(id);
    }
}
