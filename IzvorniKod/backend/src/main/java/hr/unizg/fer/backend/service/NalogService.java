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

    public List<NalogDTO> getAllNalozi() {
        return nalogRepository.findAll().stream()
                .map(NalogDTO::new)
                .collect(Collectors.toList());
    }

    public NalogDTO getNalogById(Integer id) {
        Nalog nalog = nalogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen nalog sa id: " + id));
        return new NalogDTO(nalog);
    }

    public Nalog getNalogByIdNalog(Integer id) {
        Nalog nalog = nalogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen nalog sa id: " + id));
        return nalog;
    }

    public List<NalogDTO> getAllNaloziByRadnikId(Radnik radnikId) {
        return Optional.ofNullable(nalogRepository.findByIdRadnik(radnikId))
                .filter(list -> !list.isEmpty())
                .orElseThrow(() -> new EntityNotFoundException("Nalozi not found for Radnik id: " + radnikId))
                .stream()
                .map(NalogDTO::new)
                .collect(Collectors.toList());
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

    public Nalog saveNalog(Nalog nalog) {
        nalogRepository.save(nalog);
        return nalog;
    }

    public Nalog updateNalogStatus(Integer id, String status) {
        Nalog nalog = nalogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nalog with ID " + id + " not found"));

        nalog.setStatusNalog(status);
        return nalogRepository.save(nalog);
    }



    public Optional<Nalog> findNalogById(Integer id) {
        return nalogRepository.findById(id);
    }

    public void save(Nalog nalog) {
        nalogRepository.save(nalog);
    }

    public Optional<Nalog> findById(Integer idNalog) {
        return nalogRepository.findById(idNalog);
    }
}
