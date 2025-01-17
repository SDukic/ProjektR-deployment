package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "RADNIK")
public class Radnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_radnik")
    private Integer id;

    @Column(name = "ime_radnik", nullable = false, length = 50)
    private String ime;

    @Column(name = "prezime_radnik", nullable = false, length = 50)
    private String prezime;

    @Column(name = "telefon_radnik", length = 20)
    private String telefon;

    @JsonIgnore  // Ovdje označavamo sifru da se ne šalje u JSON odgovoru
    @Column(name = "sifra_radnik", nullable = false, length = 20)
    private String sifra;

    @OneToMany(mappedBy = "radnik", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Nalog> nalozi;

    // Getteri i setteri
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public List<Nalog> getNalozi() {
        return nalozi;
    }

    public void setNalozi(List<Nalog> nalozi) {
        this.nalozi = nalozi;
    }

    public String getSifra() {
        return sifra;
    }

    public void setSifra(String sifra) {
        this.sifra = sifra;
    }
}
