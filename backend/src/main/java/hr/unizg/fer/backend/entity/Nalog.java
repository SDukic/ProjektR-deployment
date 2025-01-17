package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "NALOG")
public class Nalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nalog")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_brojilo", referencedColumnName = "id_brojilo")
    @JsonBackReference
    private Brojilo brojilo;

    @ManyToOne
    @JoinColumn(name = "id_radnik", referencedColumnName = "id_radnik")
    @JsonBackReference
    private Radnik radnik;

    @Column(name = "datum_nalog", nullable = false)
    private LocalDate datum;

    @Column(name = "status_nalog", nullable = false, length = 50)
    private String status;

    @OneToMany(mappedBy = "nalog", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Ocitanje> ocitanja;

    // Getteri i setteri
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Brojilo getBrojilo() {
        return brojilo;
    }

    public void setBrojilo(Brojilo brojilo) {
        this.brojilo = brojilo;
    }

    public Radnik getRadnik() {
        return radnik;
    }

    public void setRadnik(Radnik radnik) {
        this.radnik = radnik;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Ocitanje> getOcitanja() {
        return ocitanja;
    }

    public void setOcitanja(List<Ocitanje> ocitanja) {
        this.ocitanja = ocitanja;
    }
}
