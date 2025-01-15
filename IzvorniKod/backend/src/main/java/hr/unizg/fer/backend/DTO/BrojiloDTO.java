package hr.unizg.fer.backend.DTO;

import hr.unizg.fer.backend.entity.Brojilo;

public class BrojiloDTO {
    private Integer id;
    private String serijskiBrojBrojilo;
    private String tipBrojila;
    private String adresa;

    public BrojiloDTO(Brojilo brojilo) {
        this.id = brojilo.getId();
        this.serijskiBrojBrojilo = brojilo.getSerijskiBrojBrojilo();
        this.tipBrojila = brojilo.getTipBrojila();
        this.adresa = brojilo.getAdresa();
    }

    // Getteri i setteri
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