package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "ocitanje", schema = "public")
public class Ocitanje {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ocitanje_seq")
    @SequenceGenerator(name = "ocitanje_seq", sequenceName = "ocitanje_id_ocitanje_seq", allocationSize = 1)
    @Column(name = "id_ocitanje", nullable = false)
    private Integer id;

    @Column(name = "datum_ocitavanja", nullable = false)
    private Instant datumOcitavanja;

    @Column(name = "tarifa_visoka", precision = 10, scale = 2)
    private BigDecimal tarifaVisoka;

    @Column(name = "tarifa_niska", precision = 10, scale = 2)
    private BigDecimal tarifaNiska;

    @Column(name = "komentar", length = Integer.MAX_VALUE)
    private String komentar;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_stavka")
    @JsonBackReference("stavka-ocitanja")
    private StavkaNaloga idStavkaNaloga;

    public StavkaNaloga getIdStavkaNaloga() {
        return idStavkaNaloga;
    }

    public void setIdStavkaNaloga(StavkaNaloga idStavkaNaloga) {
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