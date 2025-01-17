package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Radnik;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RadnikRepository extends JpaRepository<Radnik, Integer> {
    List<Radnik> findAll();
    Radnik findByTelefonAndSifra(String telefon, String sifra);
}
