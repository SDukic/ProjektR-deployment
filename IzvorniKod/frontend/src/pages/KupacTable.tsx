import React, { useState, useEffect } from "react";
import "./../styles/KupacTable.css";
import api from "./loginScripts/axios"; // Importanje instancu Axios-a


type Kupac = {
  id: number;
  imeKupac: string;
  prezimeKupac: string;
  telefonKupac: string | null;
};

const KupacTable: React.FC = () => {
  const [kupci, setKupci] = useState<Kupac[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newKupac, setNewKupac] = useState<Omit<Kupac, "id">>({
    imeKupac: "",
    prezimeKupac: "",
    telefonKupac: "",
  });

  // Dohvaćanje svih kupaca
  useEffect(() => {
    api
      .get("/kupci/all")
      .then((response) => {
        console.log("Fetched kupci:", response.data);
        setKupci(response.data);
      })
      .catch((error) => console.error("Error fetching kupci:", error));
  }, []);

  // Dodavanje novog kupca
  const handleAddKupac = (event: React.FormEvent) => {
    event.preventDefault();

    const kupacData = { ...newKupac, brojila: [] };

    api
      .post("/kupci/create", kupacData)
      .then((response) => {
        console.log("Created kupac:", response.data);
        setKupci((prevKupci) => [...prevKupci, response.data]);
        setNewKupac({ imeKupac: "", prezimeKupac: "", telefonKupac: "" });
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding kupac:", error));
  };

  // Brisanje kupca
  const handleDeleteKupac = (id: number) => {
    api
      .delete(`/kupci/delete/${id}`)
      .then(() => {
        setKupci((prevKupci) => prevKupci.filter((kupac) => kupac.id !== id));
      })
      .catch((error) => console.error("Error deleting kupac:", error));
  };

  return (
    <div className="kupac-container">
      <h1 className="title">Popis Kupaca</h1>
      <button
        className="add-button"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Odustani" : "Dodaj Kupca"}
      </button>

      {showForm && (
        <form className="add-kupac-form" onSubmit={handleAddKupac}>
          <div className="form-group">
            <label>Ime:</label>
            <input
              type="text"
              value={newKupac.imeKupac}
              onChange={(e) =>
                setNewKupac((prev) => ({ ...prev, imeKupac: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Prezime:</label>
            <input
              type="text"
              value={newKupac.prezimeKupac}
              onChange={(e) =>
                setNewKupac((prev) => ({
                  ...prev,
                  prezimeKupac: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Telefon:</label>
            <input
              type="text"
              value={newKupac.telefonKupac || ""}
              onChange={(e) =>
                setNewKupac((prev) => ({
                  ...prev,
                  telefonKupac: e.target.value || null,
                }))
              }
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
          {kupci.map((kupac) => (
            <tr key={kupac.id}>
              <td>{kupac.id}</td>
              <td>{kupac.imeKupac}</td>
              <td>{kupac.prezimeKupac}</td>
              <td>{kupac.telefonKupac || "Nema telefona"}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteKupac(kupac.id)}
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

export default KupacTable;
