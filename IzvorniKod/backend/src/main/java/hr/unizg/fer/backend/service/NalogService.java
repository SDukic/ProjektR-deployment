package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.DTO.NalogDTO;
import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.entity.StavkaNaloga;
import hr.unizg.fer.backend.repository.NalogRepository;
import hr.unizg.fer.backend.repository.StavkaNalogaRepository;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NalogService {
    @Autowired
    private final NalogRepository nalogRepository;

    @Autowired
    private StavkaNalogaRepository stavkaNalogaRepository;

    public NalogService(NalogRepository nalogRepository, StavkaNalogaRepository stavkaNalogaRepository){
        this.nalogRepository = nalogRepository;
        this.stavkaNalogaRepository = stavkaNalogaRepository;
    }

    public List<Nalog> getAllNalogs() {
        return nalogRepository.findAll();
    }

    public Nalog getNalogById(Integer id){
        return nalogRepository.findById(id)
                .orElseThrow((() -> new EntityNotFoundException("Nije pronađen nalog sa id: " + id)));
    }

    public List<Nalog> getAllNaloziByRadnikId(Radnik radnikId){
        return nalogRepository.findByIdRadnik(radnikId);
    }

    public Nalog createNalog(Nalog nalog){
        return nalogRepository.save(nalog);
    }

    public Nalog updateNalog(Integer id, Nalog updatedNalog) {
        Nalog nalog = nalogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nalog with ID " + id + " not found"));

        nalog.setDatumNalog(updatedNalog.getDatumNalog());
        nalog.setStatusNalog(updatedNalog.getStatusNalog());
        nalog.setIdRadnik(updatedNalog.getIdRadnik());
        nalog.setStavkeNaloga(updatedNalog.getStavkeNaloga());

        return nalogRepository.save(nalog);
    }

    public void deleteNalog(Integer id) {
        Nalog nalog = nalogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen nalog sa id: " + id));
        nalogRepository.delete(nalog);
    }

    public void addStavkaToNalog(Integer nalogId, StavkaNaloga stavkaNaloga) {
        Nalog nalog = nalogRepository.findById(nalogId)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen nalog sa id: " + nalogId));

        stavkaNaloga.setIdNalog(nalog);
        nalog.getStavkeNaloga().add(stavkaNaloga);

        stavkaNalogaRepository.save(stavkaNaloga);
        nalogRepository.save(nalog);
    }

}
