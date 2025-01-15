package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.DTO.BrojiloDTO;
import hr.unizg.fer.backend.DTO.KupacDTO;
import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.repository.KupacRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KupacService {
    @Autowired
    private final KupacRepository kupacRepository;

    public KupacService(KupacRepository kupacRepository){
        this.kupacRepository = kupacRepository;
    }

    public List<KupacDTO> allKupci() {
        return kupacRepository.findAll().stream()
                .map(KupacDTO::new)
                .collect(Collectors.toList());
    }

    public Kupac createKupac(Kupac kupac){
        return kupacRepository.save(kupac);
    }

    public Kupac updateKupac(Integer id, Kupac updatedKupac) {
        Kupac kupac = kupacRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Kupac with ID " + id + " not found"));

        kupac.setImeKupac(updatedKupac.getImeKupac());
        kupac.setPrezimeKupac(updatedKupac.getPrezimeKupac());
        kupac.setTelefonKupac(updatedKupac.getTelefonKupac());
        kupac.setBrojila(updatedKupac.getBrojila());

        return kupacRepository.save(kupac);
    }

    public void deleteKupac(Integer id) {
        Kupac kupac = kupacRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađen kupac sa id: " + id));
        kupacRepository.delete(kupac);
    }

    public List<BrojiloDTO> getBrojilaByKupacId(Integer kupacId) {
        Kupac kupac = kupacRepository.findById(kupacId)
                .orElseThrow(() -> new EntityNotFoundException("Kupac with ID " + kupacId + " not found"));
        return kupac.getBrojila().stream()
                .map(BrojiloDTO::new)
                .collect(Collectors.toList());
    }
}