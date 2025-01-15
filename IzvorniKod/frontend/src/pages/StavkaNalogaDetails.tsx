import React, { useEffect, useState } from "react";
import "./../styles/StavkaNalogaDetails.css";
import OcitanjeForm from "./OcitanjeForm";

type Ocitanje = {
  id: number;
  datumOcitavanja: string;
  tarifaVisoka: number;
  tarifaNiska: number;
  komentar: string;
};

type Brojilo = {
  id: number;
  naziv: string; // Dodaj atribute Brojila ako ih treba prikazati
};

type StavkaNaloga = {
  id: number;
  adresaBrojila: string;
  brojilo: Brojilo | null;
  ocitanja: Ocitanje[];
};

type StavkaNalogaDetailsProps = {
  nalogId: number;
  stavkaId: number;
  onClose: () => void;
};

const StavkaNalogaDetails: React.FC<StavkaNalogaDetailsProps> = ({
  nalogId,
  stavkaId,
  onClose,
}) => {
  const [stavkaNaloga, setStavkaNaloga] = useState<StavkaNaloga | null>(null);
  const [showOcitanjeForm, setShowOcitanjeForm] = useState(false); // State for showing OcitanjeForm

  useEffect(() => {
    fetch(`http://localhost:8080/api/stavkenaloga/${stavkaId}`)
      .then((response) => response.json())
      .then((data) => setStavkaNaloga(data))
      .catch((error) => console.error("Error fetching stavka naloga details:", error));
  }, [stavkaId]);

  if (!stavkaNaloga) {
    return <div>Učitavanje...</div>;
  }

  const handleOpenOcitanjeForm = () => {
    setShowOcitanjeForm(true); // Open the form
  };

  const handleCloseOcitanjeForm = () => {
    setShowOcitanjeForm(false); // Close the form
  };

  return (
    <div className="stavka-naloga-details">
      <button onClick={onClose} className="close-button">
        Povratak na Listu
      </button>
      <h2>Detalji Stavke Naloga: {stavkaNaloga.id}</h2>
      <p>
        <strong>Adresa Brojila:</strong> {stavkaNaloga.adresaBrojila}
      </p>

      {stavkaNaloga.brojilo && (
        <p>
          <strong>Brojilo:</strong> {stavkaNaloga.brojilo.naziv} (ID: {stavkaNaloga.brojilo.id})
        </p>
      )}

      {/* Button to open OcitanjeForm */}
      <button onClick={handleOpenOcitanjeForm} className="open-form-button">
        Dodaj Očitavanje
      </button>

      {/* Conditionally render OcitanjeForm */}
      {showOcitanjeForm && (
        <OcitanjeForm
          idNalog={nalogId} // Pass the necessary props to the form
          idStavkaNaloga={stavkaNaloga.id}
          onClose={handleCloseOcitanjeForm} // Close the form when done
        />
      )}

      <h3>Očitanja</h3>
      {stavkaNaloga.ocitanja.length > 0 ? (
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
            {stavkaNaloga.ocitanja.map((ocitanje) => (
              <tr key={ocitanje.id}>
                <td>{ocitanje.id}</td>
                <td>{new Date(ocitanje.datumOcitavanja).toLocaleString()}</td>
                <td>{ocitanje.tarifaVisoka}</td>
                <td>{ocitanje.tarifaNiska}</td>
                <td>{ocitanje.komentar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema dostupnih očitanja.</p>
      )}
    </div>
  );
};

export default StavkaNalogaDetails;
