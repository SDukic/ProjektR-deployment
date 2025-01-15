import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importiramo useParams za dohvat id-a
import StavkaNalogaDetails from "./StavkaNalogaDetails"; // Import nove komponente
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
};

const NalogDetails: React.FC = () => {
  const [nalog, setNalog] = useState<Nalog | null>(null);
  const [selectedStavkaId, setSelectedStavkaId] = useState<number | null>(null);

  const { nalogId } = useParams<{ nalogId: string }>(); // Dohvaćamo nalogId iz URL-a

  useEffect(() => {
    fetch(`http://localhost:8080/api/nalozi/${nalogId}`)
      .then((response) => response.json())
      .then((data) => setNalog(data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  if (!nalog) {
    return <div>Učitavanje...</div>;
  }

  if (selectedStavkaId) {
    return (
      <StavkaNalogaDetails
      />
    );
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

      <h3>Stavke Naloga</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <Link to={`/StavkaNalogaDetails/${stavka.id}`} >
                      <strong>ID stavke:</strong> {stavka.id} <br />
          </Link>
          
        ))}
      </ul>

      <h3>Radnici zaduženi za ovaj nalog</h3>
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
          {/* Ovdje ćeš dodati redove za očitanja */}
        </tbody>
      </table>
    </div>
  );
};

export default NalogDetails;
