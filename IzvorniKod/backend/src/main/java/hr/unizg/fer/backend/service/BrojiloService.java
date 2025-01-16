package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.DTO.BrojiloDTO;
import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.repository.BrojiloRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrojiloService {
    @Autowired
    private final BrojiloRepository brojiloRepository;

    public BrojiloService(BrojiloRepository brojiloRepository) {
        this.brojiloRepository = brojiloRepository;
    }

    // Dohvatanje svih brojila i konverzija u DTO
    public List<BrojiloDTO> allBrojila() {
        return brojiloRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Kreiranje brojila i vraćanje DTO-a
    public BrojiloDTO createBrojilo(Brojilo brojilo) {
        Brojilo savedBrojilo = brojiloRepository.save(brojilo);
        return convertToDTO(savedBrojilo);
    }

    // Ažuriranje brojila i vraćanje DTO-a
    public BrojiloDTO updateBrojilo(Integer id, Brojilo updatedBrojilo) {
        Brojilo brojilo = brojiloRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brojilo with ID " + id + " not found"));

        brojilo.setSerijskiBrojBrojilo(updatedBrojilo.getSerijskiBrojBrojilo());
        brojilo.setTipBrojila(updatedBrojilo.getTipBrojila());
        brojilo.setAdresa(updatedBrojilo.getAdresa());
        brojilo.setIdKupac(updatedBrojilo.getIdKupac());

        Brojilo savedBrojilo = brojiloRepository.save(brojilo);
        return convertToDTO(savedBrojilo);
    }

    // Brisanje brojila
    public void deleteBrojilo(Integer id) {
        Brojilo brojilo = brojiloRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađeno brojilo sa id: " + id));
        brojiloRepository.delete(brojilo);
    }

    // Privatna metoda za konverziju u DTO
    private BrojiloDTO convertToDTO(Brojilo brojilo) {
        return new BrojiloDTO(brojilo);
    }
}
