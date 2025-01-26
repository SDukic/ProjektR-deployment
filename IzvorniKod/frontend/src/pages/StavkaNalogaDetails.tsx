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
        const response = await api.get(`/stavkenaloga/${stavkaId}`);
        console.log("Fetched stavka naloga details:", response.data);
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

  const handleDeleteOcitanje = async (ocitanjeId: number) => {
    try {
      await api.delete(`/ocitanja/delete/${ocitanjeId}`);
      setStavkaNaloga({
        ...stavkaNaloga,
        ocitanja: stavkaNaloga.ocitanja.filter((ocitanje) => ocitanje.id !== ocitanjeId),
      });
    } catch (error) {
      console.error("Error deleting ocitanje:", error);
    }
  };

  const handleOcitanjeCreated = (newOcitanje: Ocitanje) => {
    setStavkaNaloga({
      ...stavkaNaloga,
      ocitanja: [...stavkaNaloga.ocitanja, newOcitanje],
    });
  };

  // Odredite URL za povratak na temelju uloge
  const getReturnUrl = () => {
    return role === "radnik" ? "/RadnikTasks" : "/NalogTable";
  };

  const ocitanje = stavkaNaloga.ocitanja.length > 0 ? stavkaNaloga.ocitanja[0] : null;

  return (
    <div className="stavka-naloga-details">
      <Link to={getReturnUrl()} className="close-button">
        Povratak na Nalog
      </Link>
      <h2>Detalji Stavke Naloga: {stavkaNaloga.id}</h2>
      
      {stavkaNaloga.brojilo && (
        <p>
          <strong>Serijski Broj:</strong> {stavkaNaloga.brojilo.serijskiBrojBrojilo}
          <br />
          <strong>Adresa:</strong> {stavkaNaloga.brojilo.adresa}
        </p>
      )}

      {/* Button to open OcitanjeForm */}
      <button 
        onClick={handleOpenOcitanjeForm} 
        className="open-form-button"
        disabled={ocitanje !== null}
      >
        Dodaj Očitavanje
      </button>

      {/* Conditionally render OcitanjeForm */}
      {showOcitanjeForm && (
        <OcitanjeForm
          idStavkaNaloga={stavkaNaloga.id}
          idBrojilo={stavkaNaloga.brojilo ? stavkaNaloga.brojilo.id : 0} // Pass idBrojilo prop
          onClose={handleCloseOcitanjeForm}
          onOcitanjeCreated={handleOcitanjeCreated}
        />
      )}

      <h3>Očitavanje</h3>
      {ocitanje ? (
        <div>
          <table className="ocitanja-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Datum Očitavanja</th>
                <th>Tarifa Visoka</th>
                <th>Tarifa Niska</th>
                <th>Komentar</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ocitanje.id}</td>
                <td>{new Date(ocitanje.datumOcitavanja).toLocaleString()}</td>
                <td>{ocitanje.tarifaVisoka}</td>
                <td>{ocitanje.tarifaNiska}</td>
                <td>{ocitanje.komentar}</td>
                <td>
                  <button onClick={() => handleDeleteOcitanje(ocitanje.id)}>
                    Obriši
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nema dostupnog očitanja.</p>
      )}
    </div>
  );
};

export default StavkaNalogaDetails;