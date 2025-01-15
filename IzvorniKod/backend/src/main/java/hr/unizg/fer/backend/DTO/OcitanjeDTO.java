package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.Ocitanje;

import java.math.BigDecimal;
import java.time.Instant;

public class OcitanjeDTO {
    private Integer id;
    private Instant datumOcitavanja;
    private BigDecimal tarifaVisoka;
    private BigDecimal tarifaNiska;
    private String komentar;
    private Integer idStavkaNaloga; // ID za povezivanje sa StavkaNaloga

    public OcitanjeDTO() {}

    public OcitanjeDTO(Ocitanje ocitanje) {
        this.id = ocitanje.getId();
        this.datumOcitavanja = ocitanje.getDatumOcitavanja();
        this.tarifaVisoka = ocitanje.getTarifaVisoka();
        this.tarifaNiska = ocitanje.getTarifaNiska();
        this.komentar = ocitanje.getKomentar();
        this.idStavkaNaloga = ocitanje.getIdStavkaNaloga() != null ? ocitanje.getIdStavkaNaloga().getId() : null;
    }
    // Getters and setters

    public Integer getIdStavkaNaloga() {
        return idStavkaNaloga;
    }

    public void setIdStavkaNaloga(Integer idStavkaNaloga) {
        this.idStavkaNaloga = idStavkaNaloga;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getDatumOcitavanja() {
        return datumOcitavanja;
    }

    public void setDatumOcitavanja(Instant datumOcitavanja) {
        this.datumOcitavanja = datumOcitavanja;
    }

    public BigDecimal getTarifaVisoka() {
        return tarifaVisoka;
    }

    public void setTarifaVisoka(BigDecimal tarifaVisoka) {
        this.tarifaVisoka = tarifaVisoka;
    }

    public BigDecimal getTarifaNiska() {
        return tarifaNiska;
    }

    public void setTarifaNiska(BigDecimal tarifaNiska) {
        this.tarifaNiska = tarifaNiska;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }
}

