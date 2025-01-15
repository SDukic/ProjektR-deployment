package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.service.OcitanjeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ocitanja")
public class OcitanjeController {
    private final OcitanjeService ocitanjeService;

    public OcitanjeController(OcitanjeService ocitanjeService){
        this.ocitanjeService = ocitanjeService;
    }

    @GetMapping("/all")
    public List<Ocitanje> getAllOcitanja(){
        return ocitanjeService.allOcitanja();
    }

    @PostMapping("/create")
    public Ocitanje createOcitanje(@RequestBody Ocitanje ocitanje) {
        return ocitanjeService.createOcitanje(ocitanje);
    }

    @PutMapping("/update/{id}")
    public Ocitanje updateOcitanje(@PathVariable Integer id, @RequestBody Ocitanje ocitanje) {
        return ocitanjeService.updateOcitanje(id, ocitanje);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOcitanje(@PathVariable Integer id) {
        ocitanjeService.deleteOcitanje(id);
    }
}
