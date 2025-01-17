package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Ocitanje;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OcitanjeRepository extends JpaRepository<Ocitanje, Integer> {
    List<Ocitanje> findAll();
}
