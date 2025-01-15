import React, { useState } from "react";
import "./../styles/OcitanjeForm.css";

type OcitanjeFormProps = {
  idStavkaNaloga: number;
  onClose: () => void;
};

const OcitanjeForm: React.FC<OcitanjeFormProps> = ({ idStavkaNaloga, onClose }) => {
  const [datumOcitavanja, setDatumOcitavanja] = useState("");
  const [tarifaVisoka, setTarifaVisoka] = useState<number | undefined>(undefined);
  const [tarifaNiska, setTarifaNiska] = useState<number | undefined>(undefined);
  const [komentar, setKomentar] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatiranje datuma u ISO 8601 format sa sekunama
    const formattedDatumOcitavanja = new Date(datumOcitavanja).toISOString();

    const ocitanje = {
      datumOcitavanja: formattedDatumOcitavanja,
      tarifaVisoka,
      tarifaNiska,
      komentar,
      idStavkaNaloga,
    };

    fetch(`http://localhost:8080/api/stavkenaloga/${idStavkaNaloga}/ocitanja`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ocitanje),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Očitanje uspješno dodano!");
        } else {
          console.error("Neuspješno kreiranje očitanja");
        }
      })
      .catch((error) => console.error("Greška pri kreiranju očitanja:", error));
};

  return (
    <div className="ocitanje-form">
      <h3>Dodaj Novo Očitanje</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-field">
          <label>Datum Očitavanja:</label>
          <input
            type="datetime-local"
            value={datumOcitavanja}
            onChange={(e) => setDatumOcitavanja(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Tarifa Visoka:</label>
          <input
            type="number"
            step="0.01"
            value={tarifaVisoka ?? ""}
            onChange={(e) => setTarifaVisoka(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Tarifa Niska:</label>
          <input
            type="number"
            step="0.01"
            value={tarifaNiska ?? ""}
            onChange={(e) => setTarifaNiska(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Komentar:</label>
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">Spremi</button>
          <button type="button" className="cancel-button" onClick={onClose}>Odustani</button>
        </div>
      </form>
    </div>
  );
};

export default OcitanjeForm;
