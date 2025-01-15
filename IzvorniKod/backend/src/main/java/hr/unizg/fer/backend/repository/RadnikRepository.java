package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Radnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadnikRepository extends JpaRepository<Radnik, Integer> {
}
