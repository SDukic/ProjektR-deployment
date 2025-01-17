package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "KUPAC")
public class Kupac {
    @Id
    @Column(name = "id_kupac", length = 11)
    private String idKupac; // OIB

    @Column(name = "ime_kupac", nullable = false, length = 50)
    private String ime;

    @Column(name = "prezime_kupac", nullable = false, length = 50)
    private String prezime;

    @Column(name = "telefon_kupac", length = 20)
    private String telefon;

    @Column(name = "adresa_kupac", length = 100)
    private String adresa;



    @OneToMany(mappedBy = "kupac", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Brojilo> brojila;

    // Getteri
    public String getIdKupac() {
        return idKupac;
    }

    public String getIme() {
        return ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public String getTelefon() {
        return telefon;
    }

    public String getAdresa() {
        return adresa;
    }

    public List<Brojilo> getBrojila() {
        return brojila;
    }

    // Setteri
    public void setIdKupac(String idKupac) {
        this.idKupac = idKupac;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public void setBrojila(List<Brojilo> brojila) {
        this.brojila = brojila;
    }
}
