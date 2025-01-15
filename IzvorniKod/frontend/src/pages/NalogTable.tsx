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

  useEffect(() => {
    fetch("http://localhost:8080/api/nalozi/all")
      .then((response) => response.json())
      .then((data) => setNalozi(data))
      .catch((error) => console.error("Error fetching nalozi:", error));
  }, []);

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga</h1>
      <table className="nalog-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Status</th>
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
                <Link to={`/NalogDetails/${nalog.id}`} className="details-button">
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
