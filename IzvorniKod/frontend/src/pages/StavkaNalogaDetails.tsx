import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { useAuth } from "./loginScripts/AuthContext"; // Importiramo AuthContext
import OcitanjeForm from "./OcitanjeForm";
import "./../styles/StavkaNalogaDetails.css";
import api from "./loginScripts/axios"; 

type Ocitanje = {
  id: number;
  datumOcitavanja: string;
  tarifaVisoka: number;
  tarifaNiska: number;
  komentar: string;
};

type Brojilo = {
  id: number;
  serijskiBrojBrojilo: string;
  tipBrojila: string;
  adresa: string;
};

type StavkaNaloga = {
  id: number;
  adresaBrojila: string;
  brojilo: Brojilo | null;
  ocitanja: Ocitanje[];
};

const StavkaNalogaDetails: React.FC = () => {
  const { stavkaId } = useParams<{ stavkaId: string }>(); // Dohvaćamo stavkaId iz URL-a
  const { role } = useAuth();  // Dohvatimo trenutnu ulogu iz AuthContext
  const [stavkaNaloga, setStavkaNaloga] = useState<StavkaNaloga | null>(null);
  const [showOcitanjeForm, setShowOcitanjeForm] = useState(false); 

  useEffect(() => {
    const fetchStavkaNaloga = async () => {
      try {
        const response = await api.get(`http://localhost:8080/api/stavkenaloga/${stavkaId}`);
        setStavkaNaloga(response.data);
      } catch (error) {
        console.error("Error fetching stavka naloga details:", error);
      }
    };

    fetchStavkaNaloga();
  }, [stavkaId]);

  if (!stavkaNaloga) {
    return <div>Učitavanje...</div>;
  }

  const handleOpenOcitanjeForm = () => {
    setShowOcitanjeForm(true); 
  };

  const handleCloseOcitanjeForm = () => {
    setShowOcitanjeForm(false); 
  };

  // Odredite URL za povratak na temelju uloge
  const getReturnUrl = () => {
    return role === "radnik" ? "/RadnikTasks" : "/NalogTable";
  };

  return (
    <div className="stavka-naloga-details">
      <Link to={getReturnUrl()} className="close-button">
        Povratak na Nalog
      </Link>
      <h2>Detalji Stavke Naloga: {stavkaNaloga.id}</h2>
      <p>
        <strong>Adresa Brojila:</strong> {stavkaNaloga.adresaBrojila}
      </p>

      {stavkaNaloga.brojilo && (
        <p>
          <strong>Brojilo:</strong> {stavkaNaloga.brojilo.serijskiBrojBrojilo} (ID: {stavkaNaloga.brojilo.id})
          (SerijskiBroj: {stavkaNaloga.brojilo.serijskiBrojBrojilo})
          (adresa: {stavkaNaloga.brojilo.adresa})
        </p>
      )}

      {/* Button to open OcitanjeForm */}
      <button onClick={handleOpenOcitanjeForm} className="open-form-button">
        Dodaj Očitavanje
      </button>

      {/* Conditionally render OcitanjeForm */}
      {showOcitanjeForm && (
        <OcitanjeForm
          idStavkaNaloga={stavkaNaloga.id}
          onClose={handleCloseOcitanjeForm} 
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
