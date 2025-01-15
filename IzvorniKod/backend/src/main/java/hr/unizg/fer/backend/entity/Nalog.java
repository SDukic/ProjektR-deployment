package hr.unizg.fer.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "nalog", schema = "public")
public class Nalog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nalog_seq")
    @SequenceGenerator(name = "nalog_seq", sequenceName = "nalog_id_nalog_seq", allocationSize = 1)
    @Column(name = "id_nalog", nullable = false)
    private Integer id;

    @Column(name = "datum_nalog", nullable = false)
    private Instant datumNalog;

    @Column(name = "status_nalog", length = 50)
    private String statusNalog;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_radnik")
    @JsonBackReference("radnik-nalozi")
    private Radnik idRadnik;

    @OneToMany(mappedBy = "idNalog", cascade = CascadeType.ALL)
    @JsonManagedReference("nalog-stavke")
    private Set<StavkaNaloga> stavkeNaloga = new LinkedHashSet<>();

    public Set<StavkaNaloga> getStavkeNaloga() {
        return stavkeNaloga;
    }

    public void setStavkeNaloga(Set<StavkaNaloga> stavkaNalogas) {
        this.stavkeNaloga = stavkaNalogas;
    }

    public Radnik getIdRadnik() {
        return idRadnik;
    }

    public void setIdRadnik(Radnik idRadnik) {
        this.idRadnik = idRadnik;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getDatumNalog() {
        return datumNalog;
    }

    public void setDatumNalog(Instant datumNalog) {
        this.datumNalog = datumNalog;
    }

    public String getStatusNalog() {
        return statusNalog;
    }

    public void setStatusNalog(String statusNalog) {
        this.statusNalog = statusNalog;
    }
}