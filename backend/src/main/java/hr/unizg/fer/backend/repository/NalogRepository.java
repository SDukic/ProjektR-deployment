package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Nalog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NalogRepository extends JpaRepository<Nalog, Integer> {
    List<Nalog> findAll();
    List<Nalog> findByRadnikId(Integer idRadnik);
}

