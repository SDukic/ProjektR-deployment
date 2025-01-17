package hr.unizg.fer.backend.service;

import hr.unizg.fer.backend.entity.Brojilo;
import hr.unizg.fer.backend.repository.BrojiloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrojiloService {

    @Autowired
    private BrojiloRepository brojiloRepository;

    // Metoda za dobavljanje svih brojila
    public List<Brojilo> getAllBrojila() {
        return brojiloRepository.findAll();
    }
}
