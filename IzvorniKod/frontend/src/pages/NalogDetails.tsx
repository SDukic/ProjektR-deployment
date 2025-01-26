import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a
import { useAuth } from './loginScripts/AuthContext';
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
  ocitanja: Ocitanje[];
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
  const [showRadnikForm, setShowRadnikForm] = useState(false);
  const { nalogId } = useParams<{ nalogId: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    api
      .get(`/nalozi/${nalogId}`)
      .then((response) => setNalog(response.data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  useEffect(() => {
    if (role === 'admin') {
      api
        .get("/radnici/all")
        .then((response) => setRadnici(response.data))
        .catch((error) => console.error("Error fetching radnici:", error));
    }
  }, [role]);

  const handleStatusChange = async () => {
    if (!nalog) return;

    const newStatus = nalog.statusNalog === "Aktivan" ? "Završen" : "Aktivan";

    try {
      const response = await api.put(`/nalozi/update/${nalog.id}/status`, newStatus, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      if (response.status === 200) {
        setNalog({ ...nalog, statusNalog: newStatus });
        alert(`Status naloga ${nalog.id} uspješno promijenjen na "${newStatus}".`);
      } else {
        alert("Došlo je do pogreške prilikom ažuriranja naloga.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  const handleDeleteNalog = async () => {
    if (!nalog) return;

    try {
      await api.delete(`/nalozi/delete/${nalog.id}`);
      alert(`Nalog ${nalog.id} uspješno obrisan.`);
      navigate(role === 'admin' ? "/NalogTable" : "/RadnikTasks");
    } catch (error) {
      console.error("Error deleting nalog:", error);
      alert("Došlo je do pogreške prilikom brisanja naloga.");
    }
  };

  const handleAddRadnik = async () => {
    if (!selectedRadnikId) {
      alert("Molimo odaberite radnika.");
      return;
    }

    try {
      await api.put(`/nalozi/${nalogId}/dodijeliRadnika/${selectedRadnikId}`, { radnikId: selectedRadnikId });
      alert("Radnik uspješno dodan.");
      setShowRadnikForm(false);
      setSelectedRadnikId(null);
      // Osvježi podatke o nalogu
      const response = await api.get(`/nalozi/${nalogId}`);
      setNalog(response.data);
    } catch (error) {
      console.error("Error adding radnik:", error);
      alert("Došlo je do pogreške prilikom dodavanja radnika.");
    }
  };

  if (!nalog) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div className="nalog-details">
      <Link to={role === 'admin' ? "/NalogTable" : "/RadnikTasks"} className="close-button">
        Povratak na Listu
      </Link>
      <h2>Detalji Naloga: {nalog.id}</h2>
      <p>
        <strong>Datum Naloga:</strong> {new Date(nalog.datumNalog).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {nalog.statusNalog}
      </p>

      <div className="button-group">
        <button className="status-button" onClick={handleStatusChange}>
          Promijeni Status
        </button>
        {role === 'admin' || (role === 'radnik' && nalog.statusNalog === "Završen") ? (
          <button className="delete-nalog-button" onClick={handleDeleteNalog}>
            Obriši Nalog
          </button>
        ) : null}
        {role === 'admin' && (
          <>
            <button
              onClick={() => navigate(`/StavkaNalogaForm/${nalogId}`)}
              className="status-button"
            >
              Dodaj stavku
            </button>
            <button
              onClick={() => setShowRadnikForm(true)}
              className="status-button"
            >
              Dodaj radnika
            </button>
          </>
        )}
      </div>

      <h3>Stavke Naloga</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <li key={stavka.id}>
            <Link to={`/StavkaNalogaDetails/${stavka.id}`} className="details-link">
              <strong>ID stavke:</strong> {stavka.id}
            </Link>
            {stavka.ocitanja.length > 0 ? (
              <span className="checkmark">✔️</span>
            ) : (
              <span className="no-ocitanje">✖️</span>
            )}
          </li>
        ))}
      </ul>

      {showRadnikForm && (
        <div className="radnik-form">
          <h3>Odaberi radnika</h3>
          <select
            value={selectedRadnikId ?? ""}
            onChange={(e) => setSelectedRadnikId(Number(e.target.value))}
          >
            <option value="" disabled>
              Odaberite radnika
            </option>
            {radnici.map((radnik) => (
              <option key={radnik.id} value={radnik.id}>
                {radnik.imeRadnik} {radnik.prezimeRadnik}
              </option>
            ))}
          </select>
          <button onClick={handleAddRadnik} className="save-button">
            Dodaj Radnika
          </button>
          <button onClick={() => setShowRadnikForm(false)} className="cancel-button">
            Odustani
          </button>
        </div>
      )}

      <h3>Radnik zadužen za ovaj nalog</h3>
      {nalog.radnik ? (
        <div>
          <p>
            <strong>Ime:</strong> {nalog.radnik.imeRadnik} <br />
            <strong>Prezime:</strong> {nalog.radnik.prezimeRadnik} <br />
            <strong>Telefon:</strong> {nalog.radnik.telefonRadnik} <br />
            <strong>ID:</strong> {nalog.radnik.id}
          </p>
        </div>
      ) : (
        <p>Trenutno nema dodijeljenog radnika za ovaj nalog.</p>
      )}
    </div>
  );
};

export default NalogDetails;
