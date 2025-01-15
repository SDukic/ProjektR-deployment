package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "stavka_naloga", schema = "public")
public class StavkaNaloga {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stavka_seq")
    @SequenceGenerator(name = "stavka_seq", sequenceName = "stavka_naloga_id_stavka_seq", allocationSize = 1)
    @Column(name = "id_stavka", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nalog")
    @JsonBackReference("nalog-stavke")
    private Nalog idNalog;

    @Column(name = "adresa_brojila", length = 100)
    private String adresaBrojila;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_brojilo")
    @JsonBackReference("brojilo-stavke")
    private Brojilo idBrojilo;

    @OneToMany(mappedBy = "idStavkaNaloga",cascade = CascadeType.ALL)
    @JsonManagedReference("stavka-ocitanja")
    private Set<Ocitanje> ocitanja = new LinkedHashSet<>();

    public Set<Ocitanje> getOcitanja() {
        return ocitanja;
    }

    public void setOcitanja(Set<Ocitanje> ocitanja) {
        this.ocitanja = ocitanja;
    }

    public Brojilo getIdBrojilo() {
        return idBrojilo;
    }

    public void setIdBrojilo(Brojilo idBrojilo) {
        this.idBrojilo = idBrojilo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Nalog getIdNalog() {
        return idNalog;
    }

    public void setIdNalog(Nalog idNalog) {
        this.idNalog = idNalog;
    }

    public String getAdresaBrojila() {
        return adresaBrojila;
    }

    public void setAdresaBrojila(String adresaBrojila) {
        this.adresaBrojila = adresaBrojila;
    }

}