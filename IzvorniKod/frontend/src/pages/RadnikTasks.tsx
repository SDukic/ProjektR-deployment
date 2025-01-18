import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a
import "./../styles/NalogTable.css";

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
};

const RadnikTasks: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);
  const navigate = useNavigate();
  const [radnikId, setRadnikId] = useState<number | "">(""); // Input for Radnik ID

  const handleFilterByRadnik = () => {
    api
      .get(`/nalozi/radnik/${radnikId}`) // Koristi Axios umjesto fetch
      .then((response) => setNalozi(response.data))
      .catch((error) => alert(error.message)); // Prikazivanje greške u slučaju problema
  };

  // Function to update the status of the task
  const handleStatusChange = async (id: number) => {
    try {
      // Fetch the current nalog
      const response = await api.get(`/nalozi/${id}`); // Koristi Axios za dohvat naloga
      const nalogpr = response.data;

      let updatedStatus = nalogpr.statusNalog === "Aktivan" ? "Završen" : "Aktivan";

      // Update nalog status
      await api.put(`/nalozi/update/${id}/status`, updatedStatus); // Koristi Axios za ažuriranje statusa

      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
      navigate(0); // Osvježi stranicu nakon uspješne promjene
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  useEffect(() => {
    setRadnikId(3); // Postavljanje početnog ID-a radnika
  }, []);

  useEffect(() => {
    if (radnikId) {
      handleFilterByRadnik(); // Pozivanje funkcije za dohvat naloga prema radniku
    }
  }, [radnikId]);

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga koje treba odraditi</h1>
      <div className="filter-section"></div>

      <table className="nalog-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Promijeni Status</th>
            <th>Detalji</th>
          </tr>
        </thead>
        <tbody>
          {nalozi.map((nalog) => (
            <tr key={nalog.id}>
              <td>{nalog.id}</td>
              <td>{new Date(nalog.datumNalog).toLocaleString()}</td>
              <td>{nalog.statusNalog}</td>
              <td>
                <button
                  onClick={() => handleStatusChange(nalog.id)}
                  className="status-button"
                >
                  Promijeni Status
                </button>
              </td>
              <td>
                <Link to={`/TaskDetail/${nalog.id}`} className="details-button">
                  Prikaži Detalje
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RadnikTasks;
