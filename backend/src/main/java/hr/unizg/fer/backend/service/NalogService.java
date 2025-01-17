package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.repository.NalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NalogService {

    @Autowired
    private NalogRepository nalogRepository;

    // Metoda za dobavljanje svih naloga
    public List<Nalog> getAllNaloge() {
        return nalogRepository.findAll();
    }

    public List<Nalog> findByRadnikId(Integer idRadnik) {
        return nalogRepository.findByRadnikId(idRadnik);
    }
}
