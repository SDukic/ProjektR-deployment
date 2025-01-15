import React, { useEffect, useState } from "react";
import OcitanjeForm from "./OcitanjeForm";
import StavkaNalogaDetails from "./StavkaNalogaDetails"; // Import nove komponente
import "./../styles/NalogDetails.css";

type Ocitanje = {
  id: number;
  datumOcitavanja: string;
  tarifaVisoka: number;
  tarifaNiska: number;
  komentar: string;
};

type StavkaNaloga = {
  id: number;
  adresaBrojila: string;
};

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
  stavkeNaloga: StavkaNaloga[];
};

type NalogDetailsProps = {
  nalogId: number;
  onClose: () => void;
};

const NalogDetails: React.FC<NalogDetailsProps> = ({ nalogId, onClose }) => {
  const [nalog, setNalog] = useState<Nalog | null>(null);
  const [selectedStavkaId, setSelectedStavkaId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/nalozi/${nalogId}`)
      .then((response) => response.json())
      .then((data) => setNalog(data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  if (!nalog) {
    return <div>Učitavanje...</div>;
  }

  if (selectedStavkaId) {
    return (
      <StavkaNalogaDetails
        stavkaId={selectedStavkaId}
        nalogId={nalogId}
        onClose={() => setSelectedStavkaId(null)} // Povratak na popis naloga
      />
    );
  }

  return (
    <div className="nalog-details">
      <button onClick={onClose} className="close-button">
        Povratak na Listu
      </button>
      <h2>Detalji Naloga: {nalog.id}</h2>
      <p>
        <strong>Datum Naloga:</strong> {new Date(nalog.datumNalog).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {nalog.statusNalog}
      </p>

      <h3>Stavke Naloga</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <li
            key={stavka.id}
            onClick={() => setSelectedStavkaId(stavka.id)}
            className="stavka-item"
          >
            <strong>ID stavke:</strong> {stavka.id} <br />
            <strong>Adresa Brojila:</strong> {stavka.adresaBrojila}
          </li>
        ))}
      </ul>

      <h3>Očitanja</h3>
      <table className="ocitanja-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum Očitavanja</th>
            <th>Tarifa Visoka</th>
            <th>Tarifa Niska</th>
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  );
};

export default NalogDetails;
