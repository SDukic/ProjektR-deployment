package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "OCITANJE")
public class Ocitanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ocitanje")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_nalog", referencedColumnName = "id_nalog")
    @JsonBackReference
    private Nalog nalog;

    @Column(name = "datum_ocitavanja", nullable = false)
    private LocalDate datumOcitavanja;

    // Bez precision i scale
    @Column(name = "tarifa_niska", nullable = false)
    private Double tarifaNiska;

    @Column(name = "tarifa_visoka", nullable = false)
    private Double tarifaVisoka;

    @Column(name = "komentar")
    private String komentar;

    // Getteri i setteri
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Nalog getNalog() {
        return nalog;
    }

    public void setNalog(Nalog nalog) {
        this.nalog = nalog;
    }

    public LocalDate getDatumOcitavanja() {
        return datumOcitavanja;
    }

    public void setDatumOcitavanja(LocalDate datumOcitavanja) {
        this.datumOcitavanja = datumOcitavanja;
    }

    public Double getTarifaNiska() {
        return tarifaNiska;
    }

    public void setTarifaNiska(Double tarifaNiska) {
        this.tarifaNiska = tarifaNiska;
    }

    public Double getTarifaVisoka() {
        return tarifaVisoka;
    }

    public void setTarifaVisoka(Double tarifaVisoka) {
        this.tarifaVisoka = tarifaVisoka;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }
}
