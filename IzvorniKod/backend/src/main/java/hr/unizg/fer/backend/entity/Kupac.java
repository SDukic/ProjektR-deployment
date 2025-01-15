package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "kupac", schema = "public")
public class Kupac {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kupac_seq")
    @SequenceGenerator(name = "kupac_seq", sequenceName = "kupac_id_kupac_seq", allocationSize = 1)
    @Column(name = "id_kupac", nullable = false)
    private Integer id;

    @Column(name = "ime_kupac", nullable = false, length = 50)
    private String imeKupac;

    @Column(name = "prezime_kupac", nullable = false, length = 50)
    private String prezimeKupac;

    @Column(name = "telefon_kupac", length = 20)
    private String telefonKupac;

    @OneToMany(mappedBy = "idKupac", cascade = CascadeType.ALL)
    @JsonManagedReference("kupac-brojila")
    private List<Brojilo> brojila = new ArrayList<>();

    public List<Brojilo> getBrojila() {
        return brojila;
    }

    public void setBrojila(List<Brojilo> brojila) {
        this.brojila = brojila;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImeKupac() {
        return imeKupac;
    }

    public void setImeKupac(String imeKupac) {
        this.imeKupac = imeKupac;
    }

    public String getPrezimeKupac() {
        return prezimeKupac;
    }

    public void setPrezimeKupac(String prezimeKupac) {
        this.prezimeKupac = prezimeKupac;
    }

    public String getTelefonKupac() {
        return telefonKupac;
    }

    public void setTelefonKupac(String telefonKupac) {
        this.telefonKupac = telefonKupac;
    }

}