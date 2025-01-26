package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.DTO.BrojiloDTO;
import hr.unizg.fer.backend.DTO.StavkaNalogaDTO;
import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.repository.BrojiloRepository;
import hr.unizg.fer.backend.repository.KupacRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class BrojiloService {
    @Autowired
    private final BrojiloRepository brojiloRepository;
    @Autowired
    private KupacRepository kupacRepository;

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
    public BrojiloDTO createBrojilo(BrojiloDTO brojiloDTO) {
        Brojilo brojilo = convertToEntity(brojiloDTO);
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

    private Brojilo convertToEntity(BrojiloDTO brojiloDTO) {
        Brojilo brojilo = new Brojilo();
        brojilo.setId(brojiloDTO.getId());
        brojilo.setSerijskiBrojBrojilo(brojiloDTO.getSerijskiBrojBrojilo());
        brojilo.setTipBrojila(brojiloDTO.getTipBrojila());
        brojilo.setAdresa(brojiloDTO.getAdresa());

        if (brojiloDTO.getKupacId() != null) {
            Kupac kupac = kupacRepository.findById(brojiloDTO.getKupacId())
                    .orElseThrow(() -> new RuntimeException("Nema tog kupca"));
            brojilo.setIdKupac(kupac);
        }
        return brojilo;
    }

    public List<StavkaNalogaDTO> getStavkeNalogaByBrojiloId(Integer brojiloId) {
        Brojilo brojilo = brojiloRepository.findById(brojiloId)
                .orElseThrow(() -> new EntityNotFoundException("Brojilo not found"));
        return brojilo.getStavkaNaloga().stream()
                .map(StavkaNalogaDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<Brojilo> findBrojiloById(Integer brojiloId) {
        return brojiloRepository.findById(brojiloId);
    }
}
