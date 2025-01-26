import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a
import { useAuth } from './loginScripts/AuthContext';
import "./../styles/NalogTable.css";

type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
  radnikId: number;
};

type Radnik = {
  id: number;
  imeRadnik: string;
  prezimeRadnik: string;
  telefonRadnik: string;
};

const NalogTable: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);
  const [filteredNalozi, setFilteredNalozi] = useState<Nalog[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [radnikId, setRadnikId] = useState<number | "">("");
  const [status, setStatus] = useState<string>("");
  const [datum, setDatum] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [radnik, setRadnik] = useState<Radnik | null>(null);
  const navigate = useNavigate();
  const { role, radnikId: authRadnikId } = useAuth();

  // Dohvaćanje svih naloga
  useEffect(() => {
    console.log("Fetching all nalozi...");
    api
      .get("/nalozi/all")
      .then((response) => {
        console.log("Nalozi fetched:", response.data);
        setNalozi(response.data);
        setFilteredNalozi(response.data);
      })
      .catch((error) => console.error("Error fetching nalozi:", error));
  }, []);

  // Dohvaćanje podataka o radniku
  useEffect(() => {
    console.log("Checking role and authRadnikId...", role, authRadnikId);
    if (role === 'radnik' && authRadnikId) {
      console.log("Fetching radnik details...");
      api
        .get(`/radnici/${authRadnikId}`)
        .then((response) => {
          console.log("Radnik details fetched:", response.data);
          setRadnik(response.data);
        })
        .catch((error) => console.error("Error fetching radnik details:", error));
    }
  }, [role, authRadnikId]);

  useEffect(() => {
    console.log("Role:", role);
    console.log("Radnik:", radnik);
    console.log("Show Filter Options:", showFilterOptions);
  }, [role, radnik, showFilterOptions]);

  const applyFilters = (naloziToFilter: Nalog[]) => {
    let filtered = naloziToFilter;

    if (status !== "") {
      filtered = filtered.filter((nalog) => nalog.statusNalog === status);
    }

    if (datum !== "") {
      filtered = filtered.filter((nalog) => nalog.datumNalog.startsWith(datum));
    }

    setFilteredNalozi(filtered);
  };

  const handleFilterByRadnik = () => {
    if (radnikId === "") {
      setFilteredNalozi(nalozi);
      return;
    }

    console.log("Filtering by radnikId:", radnikId);
    api
      .get(`/nalozi/radnik/${radnikId}`)
      .then((response) => {
        console.log("Nalozi for radnik fetched:", response.data);
        applyFilters(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert(`Radnik s ID-jem ${radnikId} ne postoji.`);
        } else {
          console.error("Error fetching nalozi for radnik:", error);
        }
      });
  };

  const handleFilterByStatus = () => {
    console.log("Filtering by status:", status);
    applyFilters(nalozi);
  };

  const handleFilterByDatum = () => {
    console.log("Filtering by datum:", datum);
    applyFilters(nalozi);
  };

  const handleCreateNalog = () => {
    const newNalog = {
      datumNalog: new Date().toISOString(),
      statusNalog: "Aktivan",
    };

    console.log("Creating new nalog:", newNalog);
    api
      .post("/nalozi/create", newNalog)
      .then((response) => {
        const createdNalog = response.data;
        console.log("Nalog created:", createdNalog);
        setNalozi((prevNalozi) => [...prevNalozi, createdNalog]);
        setFilteredNalozi((prevNalozi) => [...prevNalozi, createdNalog]);
        navigate(`/NalogDetails/${createdNalog.id}`); // Preusmjeravanje na NalogDetails stranicu
      })
      .catch((error) => console.error("Error creating nalog:", error));
  };

  const handleSort = (sortType: string) => {
    console.log("Sorting by:", sortType);
    let sortedNalozi = [...filteredNalozi];

    switch (sortType) {
      case "datum-uzlazno":
        sortedNalozi.sort((a, b) => new Date(a.datumNalog).getTime() - new Date(b.datumNalog).getTime());
        break;
      case "datum-silazno":
        sortedNalozi.sort((a, b) => new Date(b.datumNalog).getTime() - new Date(a.datumNalog).getTime());
        break;
      case "status-aktivan":
        sortedNalozi.sort((a, b) => a.statusNalog.localeCompare(b.statusNalog));
        break;
      case "status-zavrsen":
        sortedNalozi.sort((a, b) => b.statusNalog.localeCompare(a.statusNalog));
        break;
      case "id-uzlazno":
        sortedNalozi.sort((a, b) => a.id - b.id);
        break;
      case "id-silazno":
        sortedNalozi.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredNalozi(sortedNalozi);
  };

  useEffect(() => {
    if (sortOption) {
      handleSort(sortOption);
    }
  }, [sortOption]);

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga</h1>
      {role === 'radnik' && radnik && (
        <div className="radnik-info">
          <p><strong>ID:</strong> {radnik.id}</p>
          <p><strong>Ime:</strong> {radnik.imeRadnik}</p>
          <p><strong>Prezime:</strong> {radnik.prezimeRadnik}</p>
          <p><strong>Telefon:</strong> {radnik.telefonRadnik}</p>
        </div>
      )}
      <button
        className="filter-button"
        onClick={() => setShowFilterOptions((prev) => !prev)}
      >
        {showFilterOptions ? "Sakrij Opcije Filtriranja" : "Prikaži Opcije Filtriranja"}
      </button>

      {showFilterOptions && (
        <div className="filter-options">
          <div className="filter-group">
            <label>ID Radnika:</label>
            <input
              type="number"
              value={radnikId}
              onChange={(e) => setRadnikId(e.target.value !== "" ? parseInt(e.target.value, 10) : "")}
              placeholder="Unesite ID radnika"
              className="filter-input"
            />
            <button onClick={handleFilterByRadnik} className="filter-button">
              Filtriraj po Radniku
            </button>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="filter-input"
            >
              <option value="">Odaberite status</option>
              <option value="Aktivan">Aktivan</option>
              <option value="Završen">Završen</option>
            </select>
            <button onClick={handleFilterByStatus} className="filter-button">
              Filtriraj po Statusu
            </button>
          </div>
          <div className="filter-group">
            <label>Datum:</label>
            <input
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              className="filter-input"
            />
            <button onClick={handleFilterByDatum} className="filter-button">
              Filtriraj po Datumu
            </button>
          </div>
        </div>
      )}

      <button onClick={handleCreateNalog} className="create-nalog-button">
        Kreiraj Novi Nalog
      </button>

      <div className="sort-group">
        <label>Poredaj po:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-input"
        >
          <option value="">Odaberite opciju</option>
          <option value="datum-uzlazno">Datum Uzlazno</option>
          <option value="datum-silazno">Datum Silazno</option>
          <option value="status-aktivan">Prvo Aktivni</option>
          <option value="status-zavrsen">Prvo Završeni</option>
          <option value="id-uzlazno">ID Uzlazno</option>
          <option value="id-silazno">ID Silazno</option>
        </select>
      </div>

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
          {filteredNalozi.map((nalog) => (
            <tr key={nalog.id}>
              <td>{nalog.id}</td>
              <td>{new Date(nalog.datumNalog).toLocaleString()}</td>
              <td>{nalog.statusNalog}</td>
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
