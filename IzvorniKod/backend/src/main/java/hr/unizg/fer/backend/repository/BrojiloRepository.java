package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Brojilo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrojiloRepository extends JpaRepository<Brojilo, Integer> {
}
