package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.Radnik;

public class RadnikDTO {
    private Integer id;
    private String imeRadnik;
    private String prezimeRadnik;
    private String telefonRadnik;

    public RadnikDTO(Radnik radnik) {
        this.id = radnik.getId();
        this.imeRadnik = radnik.getImeRadnik();
        this.prezimeRadnik = radnik.getPrezimeRadnik();
        this.telefonRadnik = radnik.getTelefonRadnik();
    }

    // Getteri i setteri
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
