import React, { useState, useEffect } from "react";
import "./../styles/KupacTable.css";

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
    fetch("http://localhost:8080/api/kupci/all")
      .then((response) => response.json())
      .then((data) => setKupci(data))
      .catch((error) => console.error("Error fetching kupci:", error));
  }, []);

  // Dodavanje novog kupca
  const handleAddKupac = (event: React.FormEvent) => {
    event.preventDefault();

    const kupacData = { ...newKupac, brojila: [] };

    fetch("http://localhost:8080/api/kupci/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kupacData),
    })
      .then((response) => response.json())
      .then((createdKupac) => {
        setKupci((prevKupci) => [...prevKupci, createdKupac]);
        setNewKupac({ imeKupac: "", prezimeKupac: "", telefonKupac: "" });
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding kupac:", error));
  };

  // Brisanje kupca
  const handleDeleteKupac = (id: number) => {
    fetch(`http://localhost:8080/api/kupci/delete/${id}`, {
      method: "DELETE",
    })
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
                setNewKupac((prev) => ({ ...prev, prezimeKupac: e.target.value }))
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
