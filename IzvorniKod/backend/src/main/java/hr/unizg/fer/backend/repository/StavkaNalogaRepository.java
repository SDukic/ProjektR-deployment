package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.StavkaNaloga;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StavkaNalogaRepository extends JpaRepository<StavkaNaloga, Integer> {
    StavkaNaloga getStavkaNalogaById(Integer id);
}
