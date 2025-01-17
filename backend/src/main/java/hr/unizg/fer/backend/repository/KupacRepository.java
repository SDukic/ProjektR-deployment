package hr.unizg.fer.backend.repository;


import hr.unizg.fer.backend.entity.Kupac;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KupacRepository extends JpaRepository<Kupac, String> {
    List<Kupac> findAll();
}

