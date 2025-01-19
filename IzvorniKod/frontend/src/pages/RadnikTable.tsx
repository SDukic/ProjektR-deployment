import React, { useState, useEffect } from "react";
import "./../styles/RadnikTable.css";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a

type Radnik = {
  id: number;
  imeRadnik: string;
  prezimeRadnik: string;
  telefonRadnik: string | null;
  password: string;
};

const RadnikTable: React.FC = () => {
  const [radnici, setRadnici] = useState<Radnik[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRadnik, setNewRadnik] = useState<Omit<Radnik, "id">>({
    imeRadnik: "",
    prezimeRadnik: "",
    telefonRadnik: "",
    password: "",
  });

  // Dohvaćanje svih radnika s API-jem koristeći Axios instancu
  useEffect(() => {
    const fetchRadnici = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/radnici/all");
        setRadnici(response.data);
      } catch (error) {
        console.error("Error fetching radnici:", error);
      }
    };

    fetchRadnici();
  }, []);

  // Dodavanje novog radnika s Axios-om
  const handleAddRadnik = async (event: React.FormEvent) => {
    event.preventDefault();

    const radnikData = { ...newRadnik, nalogs: [] };

    try {
      const response = await api.post("http://localhost:8080/api/radnici/create", radnikData);
      setRadnici((prevRadnici) => [...prevRadnici, response.data]);
      setNewRadnik({ imeRadnik: "", prezimeRadnik: "", telefonRadnik: "", password: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding radnik:", error);
    }
  };

  // Brisanje radnika s API-jem koristeći Axios
  const handleDeleteRadnik = async (id: number) => {
    try {
      await api.delete(`http://localhost:8080/api/radnici/delete/${id}`);
      setRadnici((prevRadnici) =>
        prevRadnici.filter((radnik) => radnik.id !== id)
      );
    } catch (error) {
      console.error("Error deleting radnik:", error);
    }
  };

  return (
    <div className="kupac-container">
      <h1 className="title">Popis Radnika</h1>
      <button
        className="add-button"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Odustani" : "Dodaj Radnika"}
      </button>

      {showForm && (
        <form className="add-kupac-form" onSubmit={handleAddRadnik}>
          <div className="form-group">
            <label>Ime:</label>
            <input
              type="text"
              value={newRadnik.imeRadnik}
              onChange={(e) =>
                setNewRadnik((prev) => ({ ...prev, imeRadnik: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Prezime:</label>
            <input
              type="text"
              value={newRadnik.prezimeRadnik}
              onChange={(e) =>
                setNewRadnik((prev) => ({
                  ...prev,
                  prezimeRadnik: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Telefon:</label>
            <input
              type="text"
              value={newRadnik.telefonRadnik || ""}
              onChange={(e) =>
                setNewRadnik((prev) => ({
                  ...prev,
                  telefonRadnik: e.target.value || null,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="text"
              value={newRadnik.password}
              onChange={(e) =>
                setNewRadnik((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Dodaj
          </button>
        </form>
      )}

      <table className="kupac-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Telefon</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {radnici.map((radnik) => (
            <tr key={radnik.id}>
              <td>{radnik.id}</td>
              <td>{radnik.imeRadnik}</td>
              <td>{radnik.prezimeRadnik}</td>
              <td>{radnik.telefonRadnik || "Nema telefona"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteRadnik(radnik.id)}
                >
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RadnikTable;
