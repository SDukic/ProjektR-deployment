import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/NalogTable.css";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
};

const NalogTable: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);
  const navigate = useNavigate();
  const [radnikId, setRadnikId] = useState<number | "">(""); // Input for Radnik ID

  // Dohvaćanje svih naloga
  useEffect(() => {
    api
      .get("/nalozi/all")
      .then((response) => setNalozi(response.data))
      .catch((error) => console.error("Error fetching nalozi:", error));
  }, []);

  const handleFilterByRadnik = () => {
    if (radnikId === "") {
      // Ako je input prazan, dohvatite sve naloge
      api
        .get("/nalozi/all")
        .then((response) => setNalozi(response.data))
        .catch((error) => console.error("Error fetching all nalozi:", error));
      return;
    }

    api
      .get(`/nalozi/radnik/${radnikId}`)
      .then((response) => setNalozi(response.data))
      .catch((error) => {
        if (error.response?.status === 404) {
          alert(`Radnik s ID-jem ${radnikId} ne postoji.`);
        } else {
          console.error("Error fetching nalozi for radnik:", error);
        }
      });
  };

  // Funkcija za ažuriranje statusa naloga
  const handleStatusChange = async (id: number) => {
    try {
      const response = await api.get(`/nalozi/${id}`);
      const nalog = response.data;

      let updatedStatus = nalog.statusNalog === "Aktivan" ? "Završen" : "Aktivan";

      await api.put(`/nalozi/update/${id}/status`, updatedStatus, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
      navigate(0);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  const handleCreateNalog = () => {
    const newNalog = {
      datumNalog: new Date().toISOString(),
      statusNalog: "Aktivan",
    };

    api
      .post("/nalozi/create", newNalog)
      .then((response) => {
        const createdNalog = response.data;
        setNalozi((prevNalozi) => [...prevNalozi, createdNalog]);
        navigate(`/NalogDetails/${createdNalog.id}`);
      })
      .catch((error) => console.error("Error creating nalog:", error));
  };

  const handleDeleteNalog = (id: number) => {
    api
      .delete(`/nalozi/delete/${id}`)
      .then(() => {
        setNalozi((prevNalozi) => prevNalozi.filter((nalog) => nalog.id !== id));
      })
      .catch((error) => console.error("Error deleting nalog:", error));
  };

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga</h1>
      <div className="filter-section">
        <input
          type="number"
          value={radnikId}
          onChange={(e) => setRadnikId(e.target.value !== "" ? parseInt(e.target.value, 10) : "")}
          placeholder="Unesite ID radnika"
          className="radnik-id-input"
        />
        <button onClick={handleFilterByRadnik} className="filter-button">
          Prikaži Nalog za Radnika
        </button>
      </div>
      <button onClick={handleCreateNalog} className="create-nalog-button">
        Kreiraj Novi Nalog
      </button>
      <button onClick={() => navigate("/BrojiloTable")} className="create-brojilo-button">
        Dodaj Novo Brojilo
      </button>
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
                <Link
                  to={`/NalogDetails/${nalog.id}`}
                  className="details-button"
                >
                  Prikaži Detalje
                </Link>
                <button
                  onClick={() => handleDeleteNalog(nalog.id)}
                  className="delete-nalog-button"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: nalog.statusNalog === "Završen" ? "red" : "grey",
                    color: "white",
                    cursor: nalog.statusNalog === "Završen" ? "pointer" : "not-allowed",
                  }}
                  disabled={nalog.statusNalog !== "Završen"}
                >
                  Obriši Nalog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NalogTable;
