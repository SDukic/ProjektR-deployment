package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Brojilo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BrojiloRepository extends JpaRepository<Brojilo, Integer> {
    List<Brojilo> findAll();
}
