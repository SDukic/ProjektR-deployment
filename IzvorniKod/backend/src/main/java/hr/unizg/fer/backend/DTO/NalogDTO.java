package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.Nalog;
import hr.unizg.fer.backend.entity.Radnik;

import java.util.Set;

import java.time.Instant;
import java.util.stream.Collectors;

public class NalogDTO {
    private Integer id;
    private Instant datumNalog;
    private String statusNalog;
    private RadnikDTO radnik;
    private Set<StavkaNalogaDTO> stavkeNaloga;

    public NalogDTO(Nalog nalog) {
        this.id = nalog.getId();
        this.datumNalog = nalog.getDatumNalog();
        this.statusNalog = nalog.getStatusNalog();

        this.stavkeNaloga = nalog.getStavkeNaloga().stream()
                .map(StavkaNalogaDTO::new)
                .collect(Collectors.toSet());

        Radnik radnik = nalog.getIdRadnik();
        if (radnik != null) {
            this.radnik = new RadnikDTO(radnik);
        }
    }

    // Getters and setters


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getDatumNalog() {
        return datumNalog;
    }

    public void setDatumNalog(Instant datumNalog) {
        this.datumNalog = datumNalog;
    }

    public String getStatusNalog() {
        return statusNalog;
    }

    public void setStatusNalog(String statusNalog) {
        this.statusNalog = statusNalog;
    }

    public Set<StavkaNalogaDTO> getStavkeNaloga() {
        return stavkeNaloga;
    }

    public void setStavkeNaloga(Set<StavkaNalogaDTO> stavkeNaloga) {
        this.stavkeNaloga = stavkeNaloga;
    }

    public RadnikDTO getRadnik() {
        return radnik;
    }

    public void setRadnik(RadnikDTO radnik) {
        this.radnik = radnik;
    }
}

