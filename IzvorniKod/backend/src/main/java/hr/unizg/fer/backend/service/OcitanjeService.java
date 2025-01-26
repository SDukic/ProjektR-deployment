package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.repository.OcitanjeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OcitanjeService {
    @Autowired
    private final OcitanjeRepository ocitanjeRepository;
    @Autowired
    public OcitanjeService(OcitanjeRepository ocitanjeRepository) {
        this.ocitanjeRepository = ocitanjeRepository;
    }

    public List<Ocitanje> allOcitanja(){
        return ocitanjeRepository.findAll();
    }

    public Ocitanje createOcitanje(Ocitanje ocitanje){
        return ocitanjeRepository.save(ocitanje);
    }

    public Ocitanje updateOcitanje(Integer id, Ocitanje updatedOcitanje) {
        Ocitanje ocitanje = ocitanjeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ocitanje with ID " + id + " not found"));

        ocitanje.setDatumOcitavanja(updatedOcitanje.getDatumOcitavanja());
        ocitanje.setTarifaVisoka(updatedOcitanje.getTarifaVisoka());
        ocitanje.setTarifaNiska(updatedOcitanje.getTarifaNiska());
        ocitanje.setKomentar(updatedOcitanje.getKomentar());

        return ocitanjeRepository.save(ocitanje);
    }

    public void deleteOcitanje(Integer id) {
        Ocitanje ocitanje = ocitanjeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nije pronađeno očitanje sa id: " + id));
        ocitanjeRepository.delete(ocitanje);
    }
}
