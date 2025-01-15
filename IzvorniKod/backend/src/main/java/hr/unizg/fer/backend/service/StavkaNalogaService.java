package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.StavkaNaloga;
import hr.unizg.fer.backend.repository.StavkaNalogaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StavkaNalogaService {
    @Autowired
    private final StavkaNalogaRepository stavkaNalogaRepository;

    public StavkaNalogaService(StavkaNalogaRepository stavkaNalogaRepository){
        this.stavkaNalogaRepository = stavkaNalogaRepository;
    }

    public List<StavkaNaloga> allStavkeNaloga(){
        return stavkaNalogaRepository.findAll();
    }

    public StavkaNaloga createStavkaNaloga(StavkaNaloga stavkaNaloga){
        return stavkaNalogaRepository.save(stavkaNaloga);
    }

    public StavkaNaloga updateStavkaNaloga(Integer id, StavkaNaloga updatedStavkaNaloga) {
        StavkaNaloga stavkaNaloga = stavkaNalogaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("StavkaNaloga with ID " + id + " not found"));

        stavkaNaloga.setAdresaBrojila(updatedStavkaNaloga.getAdresaBrojila());
        stavkaNaloga.setIdBrojilo(updatedStavkaNaloga.getIdBrojilo());
        stavkaNaloga.setIdNalog(updatedStavkaNaloga.getIdNalog());

        return stavkaNalogaRepository.save(stavkaNaloga);
    }

    public void deleteStavkaNaloga(Integer id) {
        StavkaNaloga stavkaNaloga = stavkaNalogaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađena stavka naloga sa id: " + id));
        stavkaNalogaRepository.delete(stavkaNaloga);
    }

    public Optional<StavkaNaloga> getStavkaNalogaById(Integer stavkaId) {
        return stavkaNalogaRepository.findById(stavkaId);
    }
}
