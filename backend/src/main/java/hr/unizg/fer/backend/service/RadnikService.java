package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Radnik;
import hr.unizg.fer.backend.repository.RadnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RadnikService {

    @Autowired
    private RadnikRepository radnikRepository;

    // Metoda za dobavljanje svih radnika
    public List<Radnik> getAllRadnici() {
        return radnikRepository.findAll();
    }
}
