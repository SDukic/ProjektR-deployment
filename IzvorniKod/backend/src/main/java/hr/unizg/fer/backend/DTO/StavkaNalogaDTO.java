package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.StavkaNaloga;

import java.util.Set;
import java.util.stream.Collectors;

public class StavkaNalogaDTO {
    private Integer id;
    private BrojiloDTO brojilo;
    private Set<OcitanjeDTO> ocitanja;

    public StavkaNalogaDTO(StavkaNaloga stavkaNaloga) {
        this.id = stavkaNaloga.getId();

        this.brojilo = stavkaNaloga.getIdBrojilo() != null ? new BrojiloDTO(stavkaNaloga.getIdBrojilo()) : null;


        // Map related entities to DTOs
        this.ocitanja = stavkaNaloga.getOcitanja().stream()
                .map(OcitanjeDTO::new)
                .collect(Collectors.toSet());
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Set<OcitanjeDTO> getOcitanja() {
        return ocitanja;
    }

    public void setOcitanja(Set<OcitanjeDTO> ocitanja) {
        this.ocitanja = ocitanja;
    }

    public BrojiloDTO getBrojilo() {
        return brojilo;
    }

    public void setBrojilo(BrojiloDTO brojilo) {
        this.brojilo = brojilo;
    }
}
