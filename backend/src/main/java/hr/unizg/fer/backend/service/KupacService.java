package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Kupac;
import hr.unizg.fer.backend.repository.KupacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KupacService {

    @Autowired
    private KupacRepository kupacRepository;

    // Metoda za dobavljanje svih kupaca
    public List<Kupac> getAllKupci() {
        return kupacRepository.findAll();
    }

    // Dodatne metode mogu biti dodane, na primer:
    // public Kupac getKupacById(String id) { ... }
}
