package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.repository.BrojiloRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrojiloService {
    @Autowired
    private final BrojiloRepository brojiloRepository;

    public BrojiloService(BrojiloRepository brojiloRepository){
        this.brojiloRepository = brojiloRepository;
    }

    public List<Brojilo> allBrojila() {
        return brojiloRepository.findAll();
    }

    public Brojilo createBrojilo(Brojilo brojilo){
        return brojiloRepository.save(brojilo);
    }

    public Brojilo updateBrojilo(Integer id, Brojilo updatedBrojilo) {
        Brojilo brojilo = brojiloRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brojilo with ID " + id + " not found"));

        brojilo.setSerijskiBrojBrojilo(updatedBrojilo.getSerijskiBrojBrojilo());
        brojilo.setTipBrojila(updatedBrojilo.getTipBrojila());
        brojilo.setAdresa(updatedBrojilo.getAdresa());
        brojilo.setIdKupac(updatedBrojilo.getIdKupac());

        return brojiloRepository.save(brojilo);
    }

    public void deleteBrojilo(Integer id) {
        Brojilo brojilo = brojiloRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađeno brojilo sa id: " + id));
        brojiloRepository.delete(brojilo);
    }
}
