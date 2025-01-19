import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StavkaNalogaDetails from "./StavkaNalogaDetails";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a
import "./../styles/NalogDetails.css";

type StavkaNaloga = {
  id: number;
  adresaBrojila: string;
};

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
  stavkeNaloga: StavkaNaloga[];
  radnik: Radnik | null;
};

type Radnik = {
  id: number;
  imeRadnik: string;
  prezimeRadnik: string;
  telefonRadnik: string;
};

const NalogDetails: React.FC = () => {
  const [nalog, setNalog] = useState<Nalog | null>(null);
  const [radnici, setRadnici] = useState<Radnik[]>([]);
  const [selectedRadnikId, setSelectedRadnikId] = useState<number | null>(null);
  const [selectedStavkaId, setSelectedStavkaId] = useState<number | null>(null);
  const { nalogId } = useParams<{ nalogId: string }>();
  const navigate = useNavigate();

  // Fetch nalog data
  useEffect(() => {
    api
      .get(`/nalozi/${nalogId}`)
      .then((response) => setNalog(response.data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  // Fetch radnici data
  useEffect(() => {
    api
      .get("/radnici/all")
      .then((response) => setRadnici(response.data))
      .catch((error) => console.error("Error fetching radnici:", error));
  }, []);

  const handleStatusChange = async (id: number) => {
    try {
      const response = await api.get(`/nalozi/${id}`);
      const nalogpr = response.data;

      let updatedStatus = "null";
      if (nalogpr.statusNalog === "Aktivan") {
        updatedStatus = "Završen";
      } else {
        updatedStatus = "Aktivan";
      }

      // Ažuriraj status naloga
      await api.put(`/nalozi/update/${id}/status`, { statusNalog: updatedStatus });

      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
      navigate(0);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  // Handle Radnik selection and Nalog update
  const handleRadnikSubmit = async () => {
    if (!selectedRadnikId || !nalogId) {
      alert("Odaberite radnika i provjerite podatke naloga.");
      return;
    }

    try {
      await api.put(
        `/nalozi/${nalogId}/dodjeliRadnika/${selectedRadnikId}`
      );
      alert("Radnik je uspješno dodijeljen!");
      navigate(0);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do greške prilikom dodavanja radnika.");
    }
  };

  if (!nalog) {
    return <div>Učitavanje...</div>;
  }

  if (selectedStavkaId) {
    return <StavkaNalogaDetails />;
  }

  return (
    <div className="nalog-details">
      <Link to="/" className="close-button">
        Povratak na Listu
      </Link>
      <h2>Detalji Naloga: {nalog.id}</h2>
      <p>
        <strong>Datum Naloga:</strong> {new Date(nalog.datumNalog).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {nalog.statusNalog}
      </p>

      <p>Dodaj Stavke Na Nalog</p>
      <button className="open-form-button">
        <Link to={`/StavkaNalogaForm/${nalogId}`}>Dodaj stavku</Link>
      </button>

      <p>PROMJENI STATUS NALOGA</p>
      <button className="open-form-button" onClick={() => handleStatusChange(nalog.id)}>
        PROMJENI STATUS
      </button>

      <h3>Stavke Naloga</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <Link to={`/StavkaNalogaDetails/${stavka.id}`} key={stavka.id}>
            <strong>ID stavke:</strong> {stavka.id} <br />
          </Link>
        ))}
      </ul>

      <h3>Radnik Zaduženi za Ovaj Nalog</h3>
      {nalog.radnik ? (
        <div>
          <p>
            <strong>Ime radnika:</strong> {nalog.radnik.imeRadnik} <br />
            <strong>Prezime radnika:</strong> {nalog.radnik.prezimeRadnik} <br />
            <strong>Telefon radnika:</strong> {nalog.radnik.telefonRadnik} <br />
            <strong>ID radnika:</strong> {nalog.radnik.id}
          </p>
          <h3>Promjenite radnika</h3>
          <ul>
            {radnici.map((radnik) => (
              <li key={radnik.id}>
                <label>
                  <input
                    type="radio"
                    name="radnik"
                    value={radnik.id}
                    onChange={() => setSelectedRadnikId(radnik.id)}
                  />
                  {`${radnik.imeRadnik} ${radnik.prezimeRadnik}, Telefon: ${radnik.telefonRadnik}`}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleRadnikSubmit} disabled={!selectedRadnikId}>
            Dodijeli Radnika
          </button>
        </div>
      ) : (
        <div>
          <p>Trenutno nema dodijeljenog radnika za ovaj nalog.</p>
          <h3>Dodajte radnika</h3>
          <ul>
            {radnici.map((radnik) => (
              <li key={radnik.id}>
                <label>
                  <input
                    type="radio"
                    name="radnik"
                    value={radnik.id}
                    onChange={() => setSelectedRadnikId(radnik.id)}
                  />
                  {`${radnik.imeRadnik} ${radnik.prezimeRadnik}, Telefon: ${radnik.telefonRadnik}`}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleRadnikSubmit} disabled={!selectedRadnikId}>
            Dodijeli Radnika
          </button>
        </div>
      )}
    </div>
  );
};

export default NalogDetails;
