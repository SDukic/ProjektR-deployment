package hr.unizg.fer.projektR.citac_brojila;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api") // Dodaj ovu oznaku
public class OcitavanjeBrojilaController {

    @Autowired
    private RestTemplate restTemplate;

    private List<OcitavanjeBrojilaRequest> ocitanja = new ArrayList<>();

    @PostConstruct
    public void init() {
        // Generiranje nasumičnih unosa
        Random random = new Random();
        for (int i = 1; i <= 40; i++) {
            String randomName = getRandomName();
            System.out.println(randomName);  // Dohvati nasumično ime
            OcitavanjeBrojilaRequest ocitanje = new OcitavanjeBrojilaRequest();
            ocitanje.setKupac(randomName);
            ocitanje.setGornjaTarifa(random.nextInt(1000) + 500);
            ocitanje.setDonjaTarifa(random.nextInt(500) + 100);
            String randomName2 = getRandomName();
            String randomName3 = getRandomName();
            ocitanje.setRadnici(randomName2 + "i" + randomName3);
            ocitanje.setNalog(random.nextInt(1000) + 1);
            ocitanja.add(ocitanje);
        }
    }

    // Funkcija koja poziva RandomUser API i vraća nasumično ime
    private String getRandomName() {
        String url = "https://randomuser.me/api/";
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        
        // Provjera odgovora
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Map<String, Object> results = (Map<String, Object>) ((List<?>) response.getBody().get("results")).get(0);
            Map<String, String> nameMap = (Map<String, String>) results.get("name");
            String firstName = nameMap.get("first");
            String lastName = nameMap.get("last");
            return firstName + " " + lastName;  // Nasumično ime
        }
        return "Nepoznat Kupac";  // Default ime ako nešto pođe po zlu
    }

    // Ostatak koda za vraćanje podataka
    @GetMapping("/svaOcitanja")
    public List<OcitavanjeBrojilaRequest> svaOcitanja() {
        return ocitanja;
    }

    @PostMapping("/spremiOcitavanje")
    public ResponseEntity<OcitavanjeBrojilaRequest> spremiOcitavanje(@RequestBody OcitavanjeBrojilaRequest request) {
        ocitanja.add(request); // Spremi novi unos
        return ResponseEntity.ok(request); // Vrati novi unos kao odgovor
    }

    public static class OcitavanjeBrojilaRequest {
        private String kupac;
        private int gornjaTarifa;
        private int donjaTarifa;
        private String radnici;
        private int nalog;

        // Getteri i setteri
        public String getKupac() {
            return kupac;
        }

        public void setKupac(String kupac) {
            this.kupac = kupac;
        }

        public int getGornjaTarifa() {
            return gornjaTarifa;
        }

        public void setGornjaTarifa(int gornjaTarifa) {
            this.gornjaTarifa = gornjaTarifa;
        }

        public int getDonjaTarifa() {
            return donjaTarifa;
        }

        public void setDonjaTarifa(int donjaTarifa) {
            this.donjaTarifa = donjaTarifa;
        }

        public String getRadnici() {
            return radnici;
        }

        public void setRadnici(String radnici) {
            this.radnici = radnici;
        }

        public int getNalog() {
            return nalog;
        }

        public void setNalog(int nalog) {
            this.nalog = nalog;
        }
    }
}
