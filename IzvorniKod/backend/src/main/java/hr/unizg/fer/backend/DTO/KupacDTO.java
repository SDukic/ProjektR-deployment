package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.Kupac;

public class KupacDTO {
    private Integer id;
    private String imeKupac;
    private String prezimeKupac;
    private String telefonKupac;

    public KupacDTO(Kupac kupac) {
        this.id = kupac.getId();
        this.imeKupac = kupac.getImeKupac();
        this.prezimeKupac = kupac.getPrezimeKupac();
        this.telefonKupac = kupac.getTelefonKupac();
    }

    // Getteri i setteri
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
