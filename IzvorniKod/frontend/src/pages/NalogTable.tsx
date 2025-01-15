import React, { useState, useEffect } from "react";
import NalogDetails from "./NalogDetails";
import "./../styles/NalogTable.css";

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
};

const NalogTable: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);
  const [selectedNalogId, setSelectedNalogId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/nalozi/all")
      .then((response) => response.json())
      .then((data) => setNalozi(data))
      .catch((error) => console.error("Error fetching nalozi:", error));
  }, []);

  if (selectedNalogId !== null) {
    return (
      <NalogDetails
        nalogId={selectedNalogId}
        onClose={() => setSelectedNalogId(null)} // Povratak na listu naloga
      />
    );
  }

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
                <button
                  className="details-button"
                  onClick={() => setSelectedNalogId(nalog.id)}
                >
                  Prikaži Detalje
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
