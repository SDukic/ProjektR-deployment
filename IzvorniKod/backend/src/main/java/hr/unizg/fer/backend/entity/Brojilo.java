package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "brojilo", schema = "public")
public class Brojilo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "brojilo_seq")
    @SequenceGenerator(name = "brojilo_seq", sequenceName = "brojilo_id_brojilo_seq", allocationSize = 1)
    @Column(name = "id_brojilo", nullable = false)
    private Integer id;

    @Column(name = "serijski_broj_brojilo", nullable = false, length = 50)
    private String serijskiBrojBrojilo;

    @Column(name = "tip_brojila", length = 50)
    private String tipBrojila;

    @Column(name = "adresa", length = 100)
    private String adresa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_kupac")
    @JsonBackReference("kupac-brojila")
    private Kupac idKupac;

    @OneToMany(mappedBy = "idBrojilo", cascade = CascadeType.ALL)
    @JsonManagedReference("brojilo-stavke")
    private Set<StavkaNaloga> stavkaNaloga = new LinkedHashSet<>();

    public Set<StavkaNaloga> getStavkaNaloga() {
        return stavkaNaloga;
    }

    public void setStavkaNaloga(Set<StavkaNaloga> stavkaNaloga) {
        this.stavkaNaloga = stavkaNaloga;
    }

    public Kupac getIdKupac() {
        return idKupac;
    }

    public void setIdKupac(Kupac idKupac) {
        this.idKupac = idKupac;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSerijskiBrojBrojilo() {
        return serijskiBrojBrojilo;
    }

    public void setSerijskiBrojBrojilo(String serijskiBrojBrojilo) {
        this.serijskiBrojBrojilo = serijskiBrojBrojilo;
    }

    public String getTipBrojila() {
        return tipBrojila;
    }

    public void setTipBrojila(String tipBrojila) {
        this.tipBrojila = tipBrojila;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

}