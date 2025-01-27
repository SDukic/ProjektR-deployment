import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "./loginScripts/axios"; // Importanje Axios instance
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

const TaskDetail: React.FC = () => {
  const [nalog, setNalog] = useState<Nalog | null>(null);
  const { nalogId } = useParams<{ nalogId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/nalozi/${nalogId}`)
      .then((response) => setNalog(response.data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  const handleStatusChange = async (id: number) => {
    try {
      // Dohvati trenutni nalog
      const response = await api.get(`/nalozi/${id}`);
      const nalogpr = response.data;

      let updatedStatus = "null";
      console.log(nalogpr.statusNalog);

      if (nalogpr.statusNalog === "Aktivan") {
        updatedStatus = "Završen";
      } else {
        updatedStatus = "Aktivan";
      }

      console.log(updatedStatus);

      // Ažuriraj nalog
      const updatedNalog = { ...nalogpr, statusNalog: updatedStatus };

      await api.put(`/nalozi/update/${id}/status`, updatedStatus, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
      navigate(0);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  if (!nalog) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div className="nalog-details">
      <Link to="/RadnikTasks" className="close-button">
        Povratak na Zadaci Radnika
      </Link>
      <h2>Detalji Zadataka: {nalog.id}</h2>
      <p>
        <strong>Datum Naloga:</strong> {new Date(nalog.datumNalog).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {nalog.statusNalog}
      </p>

      <p>PROMJENI STATUS NALOGA</p>
      <button className="open-form-button" onClick={() => handleStatusChange(nalog.id)}>
        PROMJENI STATUS
      </button>

      <h3>Zadaci na ovom nalogu</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <Link to={`/StavkaNalogaDetails/${stavka.id}`} key={stavka.id}>
            <strong>ID stavke:</strong> {stavka.id} <br />
          </Link>
        ))}
      </ul>

      <h3>Radnik Zaduženi za Ovaj Nalog</h3>
      {nalog.radnik ? (
        <p>
          <strong>Ime radnika:</strong> {nalog.radnik.imeRadnik} <br />
          <strong>Prezime radnika:</strong> {nalog.radnik.prezimeRadnik} <br />
          <strong>Telefon radnika:</strong> {nalog.radnik.telefonRadnik} <br />
          <strong>ID radnika:</strong> {nalog.radnik.id}
        </p>
      ) : (
        <p>Trenutno nema dodijeljenog radnika za ovaj nalog.</p>
      )}
    </div>
  );
};

export default TaskDetail;
