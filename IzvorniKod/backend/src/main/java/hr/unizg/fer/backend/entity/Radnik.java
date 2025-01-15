package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "radnik", schema = "public")
public class Radnik {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "radnik_seq")
    @SequenceGenerator(name = "radnik_seq", sequenceName = "radnik_id_radnik_seq", allocationSize = 1)
    @Column(name = "id_radnik", nullable = false)
    private Integer id;

    @Column(name = "ime_radnik", nullable = false, length = 50)
    private String imeRadnik;

    @Column(name = "prezime_radnik", nullable = false, length = 50)
    private String prezimeRadnik;

    @Column(name = "telefon_radnik", length = 20)
    private String telefonRadnik;

    // cascade = CascadeType.ALL ?
    @OneToMany(mappedBy = "idRadnik")
    @JsonManagedReference("radnik-nalozi")
    private Set<Nalog> nalogs = new LinkedHashSet<>();

    public Set<Nalog> getNalogs() {
        return nalogs;
    }

    public void setNalogs(Set<Nalog> nalogs) {
        this.nalogs = nalogs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImeRadnik() {
        return imeRadnik;
    }

    public void setImeRadnik(String imeRadnik) {
        this.imeRadnik = imeRadnik;
    }

    public String getPrezimeRadnik() {
        return prezimeRadnik;
    }

    public void setPrezimeRadnik(String prezimeRadnik) {
        this.prezimeRadnik = prezimeRadnik;
    }

    public String getTelefonRadnik() {
        return telefonRadnik;
    }

    public void setTelefonRadnik(String telefonRadnik) {
        this.telefonRadnik = telefonRadnik;
    }

}