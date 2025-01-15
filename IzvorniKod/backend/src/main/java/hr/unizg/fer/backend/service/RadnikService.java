package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.repository.KupacRepository;
import hr.unizg.fer.backend.repository.RadnikRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RadnikService {
    @Autowired
    private final RadnikRepository radnikRepository;
    @Autowired
    private KupacRepository kupacRepository;

    public RadnikService(RadnikRepository radnikRepository){
        this.radnikRepository = radnikRepository;
    }

    public List<Radnik> allRadnici(){
        return radnikRepository.findAll();
    }

    public Radnik createRadnik(Radnik radnik){
        return radnikRepository.save(radnik);
    }

    public Radnik updateRadnik(Integer id, Radnik updatedRadnik) {
        Radnik radnik = radnikRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Radnik with ID " + id + " not found"));

        radnik.setImeRadnik(updatedRadnik.getImeRadnik());
        radnik.setPrezimeRadnik(updatedRadnik.getPrezimeRadnik());
        radnik.setTelefonRadnik(updatedRadnik.getTelefonRadnik());
        radnik.setNalogs(updatedRadnik.getNalogs());

        return radnikRepository.save(radnik);
    }

    public void deleteRadnik(Integer id) {
        Radnik radnik = radnikRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen radnik sa id: " + id));
        radnikRepository.delete(radnik);
    }
}
