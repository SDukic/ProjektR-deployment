import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importiramo Link
import "./../styles/NalogTable.css";

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
};

const NalogTable: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);

  // Dohvaćanje svih naloga
  useEffect(() => {
    fetch("http://localhost:8080/api/nalozi/all")
      .then((response) => response.json())
      .then((data) => setNalozi(data))
      .catch((error) => console.error("Error fetching nalozi:", error));
  }, []);

  // Funkcija za ažuriranje statusa naloga
  const handleStatusChange = async (id: number) => {
    try {
      // Dohvati trenutni nalog
      const response = await fetch(`http://localhost:8080/api/nalozi/${id}`);
      const nalog = await response.json();

      // Prebaci status
      const updatedStatus =
        nalog.statusNalog === "Aktivan" ? "Završen" : "Aktivan";

      // Ažuriraj nalog
      const updatedNalog = { ...nalog, statusNalog: updatedStatus };

      await fetch(`http://localhost:8080/api/nalozi/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNalog),
      });

      // Osvježi stanje naloga
      setNalozi((prevNalozi) =>
        prevNalozi.map((n) =>
          n.id === id ? { ...n, statusNalog: updatedStatus } : n
        )
      );

      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga</h1>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NalogTable;
