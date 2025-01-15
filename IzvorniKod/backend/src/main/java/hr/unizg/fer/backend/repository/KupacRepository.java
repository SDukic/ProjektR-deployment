package hr.unizg.fer.backend.repository;

import hr.unizg.fer.backend.entity.Kupac;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KupacRepository extends JpaRepository<Kupac, Integer> {
}
