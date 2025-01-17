package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "BROJILO")
public class Brojilo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_brojilo")
    private Integer id;

    @Column(name = "serijski_broj_brojilo", nullable = false, length = 50)
    private String serijskiBroj;

    @Column(name = "tip_brojila", nullable = false, length = 50)
    private String tip;

    @ManyToOne
    @JoinColumn(name = "id_kupac", referencedColumnName = "id_kupac")
    @JsonBackReference
    private Kupac kupac;

    @OneToMany(mappedBy = "brojilo", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Nalog> nalozi;

    // Getteri i setteri

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSerijskiBroj() {
        return serijskiBroj;
    }

    public void setSerijskiBroj(String serijskiBroj) {
        this.serijskiBroj = serijskiBroj;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public Kupac getKupac() {
        return kupac;
    }

    public void setKupac(Kupac kupac) {
        this.kupac = kupac;
    }

    public List<Nalog> getNalozi() {
        return nalozi;
    }

    public void setNalozi(List<Nalog> nalozi) {
        this.nalozi = nalozi;
    }
}
