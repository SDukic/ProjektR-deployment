package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.StavkaNaloga;

import java.util.Set;
import java.util.stream.Collectors;

public class StavkaNalogaDTO {
    private Integer id;
    private String adresaBrojila;
    private Set<OcitanjeDTO> ocitanja;

    public StavkaNalogaDTO(StavkaNaloga stavkaNaloga) {
        this.id = stavkaNaloga.getId();

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

    public String getAdresaBrojila() {
        return adresaBrojila;
    }

    public void setAdresaBrojila(String adresaBrojila) {
        this.adresaBrojila = adresaBrojila;
    }

    public Set<OcitanjeDTO> getOcitanja() {
        return ocitanja;
    }

    public void setOcitanja(Set<OcitanjeDTO> ocitanja) {
        this.ocitanja = ocitanja;
    }
}
