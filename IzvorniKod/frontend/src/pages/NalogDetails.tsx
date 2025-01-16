import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StavkaNalogaDetails from "./StavkaNalogaDetails";
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

type Radnik = {
  id: number;
  imeRadnik: String;
  prezimeRadnik: String;
  telefonRadnik: String;
};

const NalogDetails: React.FC = () => {
  const [nalog, setNalog] = useState<Nalog | null>(null);
  const [radnik, setRadnik] = useState<Radnik | null>(null);
  const [selectedStavkaId, setSelectedStavkaId] = useState<number | null>(null);
  const { nalogId } = useParams<{ nalogId: string }>();

  // Fetch nalog data
  useEffect(() => {
    fetch(`http://localhost:8080/api/nalozi/${nalogId}`)
      .then((response) => response.json())
      .then((data) => setNalog(data))
      .catch((error) => console.error("Error fetching nalog details:", error));
  }, [nalogId]);

  // Fetch radnik data
  useEffect(() => {
    fetch(`http://localhost:8080/api/nalozi/radnik/nalog/${nalogId}`)
      .then((response) => response.json())
      .then((data) => setRadnik(data))
      .catch((error) => console.error("Error fetching radnik details:", error));
  }, [nalogId]);

  // Conditional rendering logic
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

      <h3>Stavke Naloga</h3>
      <ul>
        {nalog.stavkeNaloga.map((stavka) => (
          <Link to={`/StavkaNalogaDetails/${stavka.id}`} key={stavka.id}>
            <strong>ID stavke:</strong> {stavka.id} <br />
          </Link>
        ))}
      </ul>

      <h3>Radnik zaduženi za ovaj nalog</h3>
      <p>
        <strong>Ime radnika:
          </strong> {radnik?.imeRadnik}
        <strong> Prezime radnika:
          </strong> {radnik?.prezimeRadnik}
        <strong> Telefon radnika:
          </strong> {radnik?.telefonRadnik}
        <strong> Id radnika:
          </strong> {radnik?.id}
      </p>
    </div>
  );
};

export default NalogDetails;
