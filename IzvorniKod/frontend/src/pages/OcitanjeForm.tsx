import React, { useState, useEffect } from "react";
import "./../styles/OcitanjeForm.css";
import { useNavigate } from "react-router-dom";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a

type OcitanjeFormProps = {
  idStavkaNaloga: number;
  idBrojilo: number; // Dodajemo ID brojila kao prop
  onClose: () => void;
  onOcitanjeCreated: (ocitanje: Ocitanje) => void; // Dodajemo callback za obavještavanje o stvaranju očitanja
};

type Ocitanje = {
  id: number;
  datumOcitavanja: string;
  tarifaVisoka: number;
  tarifaNiska: number;
  komentar: string;
  idStavkaNaloga: number;
};

const OcitanjeForm: React.FC<OcitanjeFormProps> = ({ idStavkaNaloga, idBrojilo, onClose, onOcitanjeCreated }) => {
  const [datumOcitavanja, setDatumOcitavanja] = useState("");
  const [tarifaVisoka, setTarifaVisoka] = useState<number | undefined>(undefined);
  const [tarifaNiska, setTarifaNiska] = useState<number | undefined>(undefined);
  const [komentar, setKomentar] = useState("");
  const [prosjekVisoka, setProsjekVisoka] = useState<number | null>(null);
  const [prosjekNiska, setProsjekNiska] = useState<number | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [ocitanja, setOcitanja] = useState<Ocitanje[]>([]); // Dodajemo stanje za očitanja
  const [overrideWarning, setOverrideWarning] = useState<boolean>(false); // Dodajemo stanje za override upozorenja
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOcitanja = async () => {
      try {
        // Dohvati sve stavke naloga za određeno brojilo
        const stavkeResponse = await api.get(`/brojila/${idBrojilo}/stavkenaloga`);
        const stavkeNaloga = stavkeResponse.data;

        console.log(stavkeNaloga)

        if (stavkeNaloga.length > 0) {
          // Dohvati sva očitanja za te stavke naloga
          const ocitanjaPromises = stavkeNaloga.map((stavka: any) =>
            api.get(`/stavkenaloga/${stavka.id}/ocitanja`)
          );
          const ocitanjaResponses = await Promise.all(ocitanjaPromises);
          const ocitanja = ocitanjaResponses.flatMap(response => response.data);

          setOcitanja(ocitanja); // Spremi dohvaćena očitanja u stanje

          if (ocitanja.length > 0) {
            const totalVisoka = ocitanja.reduce((sum: number, ocitanje: Ocitanje) => sum + ocitanje.tarifaVisoka, 0);
            const totalNiska = ocitanja.reduce((sum: number, ocitanje: Ocitanje) => sum + ocitanje.tarifaNiska, 0);
            setProsjekVisoka(totalVisoka / ocitanja.length);
            setProsjekNiska(totalNiska / ocitanja.length);
          }
        }
      } catch (error) {
        console.error("Error fetching ocitanja:", error);
      }
    };

    fetchOcitanja();
  }, [idBrojilo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tarifaVisoka === undefined || tarifaNiska === undefined) {
      setWarning("Tarifa Visoka i Tarifa Niska moraju biti unesene.");
      return;
    }

    let warningMessage: string | null = null;

    if (prosjekVisoka !== null && prosjekNiska !== null) {
      const razlikaVisoka = Math.abs((tarifaVisoka - prosjekVisoka) / prosjekVisoka);
      const razlikaNiska = Math.abs((tarifaNiska - prosjekNiska) / prosjekNiska);

      if (razlikaVisoka > 0.1 || razlikaNiska > 0.1) {
        warningMessage = "Unesene tarife se razlikuju za više od 10% od prosjeka prijašnjih očitanja.";
      }
    }

    if (warningMessage && !overrideWarning) {
      setWarning(warningMessage);
      setOverrideWarning(true); // Omogućujemo override upozorenja
      return;
    }

    // Formatiranje datuma u ISO 8601 format sa sekunama
    const formattedDatumOcitavanja = new Date(datumOcitavanja).toISOString();

    const ocitanje = {
      datumOcitavanja: formattedDatumOcitavanja,
      tarifaVisoka,
      tarifaNiska,
      komentar,
      idStavkaNaloga,
    };

    try {
      const response = await api.post(`/stavkenaloga/${idStavkaNaloga}/ocitanja`, ocitanje);
      onOcitanjeCreated(response.data); // Obavijestimo roditeljsku komponentu o novom očitanju
      onClose(); // Zatvorimo formu nakon uspješnog stvaranja očitanja
    } catch (error) {
      console.error("Error creating ocitanje:", error);
    }
  };

  return (
    <div className="ocitanje-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Datum Očitavanja:</label>
          <input
            type="datetime-local"
            value={datumOcitavanja}
            onChange={(e) => setDatumOcitavanja(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Tarifa Visoka:</label>
          <input
            type="number"
            step="0.01"
            value={tarifaVisoka ?? ""}
            onChange={(e) => setTarifaVisoka(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="form-field">
          <label>Tarifa Niska:</label>
          <input
            type="number"
            step="0.01"
            value={tarifaNiska ?? ""}
            onChange={(e) => setTarifaNiska(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="form-field">
          <label>Komentar:</label>
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
          />
        </div>

        {warning && <p className="warning">{warning}</p>}

        <div className="form-actions">
          <button type="submit" className="save-button">Spremi</button>
          <button type="button" className="cancel-button" onClick={onClose}>Odustani</button>
        </div>
      </form>
    </div>
  );
};

export default OcitanjeForm;
