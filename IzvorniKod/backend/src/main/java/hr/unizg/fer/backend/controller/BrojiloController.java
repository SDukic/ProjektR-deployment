package hr.unizg.fer.backend.controller;

import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.service.BrojiloService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brojila")
public class BrojiloController {
    private final BrojiloService brojiloService;

    public BrojiloController(BrojiloService brojiloService){
        this.brojiloService = brojiloService;
    }

    @GetMapping("/all")
    public List<Brojilo> getAllBrojila(){
        return brojiloService.allBrojila();
    }

    @PostMapping("/create")
    public Brojilo createBrojilo(@RequestBody Brojilo brojilo) {
        return brojiloService.createBrojilo(brojilo);
    }

    @PutMapping("/update/{id}")
    public Brojilo updateBrojilo(@PathVariable Integer id, @RequestBody Brojilo brojilo) {
        return brojiloService.updateBrojilo(id, brojilo);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBrojilo(@PathVariable Integer id) {
        brojiloService.deleteBrojilo(id);
    }
}
