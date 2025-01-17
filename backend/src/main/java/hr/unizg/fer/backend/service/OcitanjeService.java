package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Ocitanje;
import hr.unizg.fer.backend.repository.OcitanjeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OcitanjeService {

    @Autowired
    private OcitanjeRepository ocitanjeRepository;

    // Metoda za dobavljanje svih očitanja
    public List<Ocitanje> getAllOcitanja() {
        return ocitanjeRepository.findAll();
    }
}
