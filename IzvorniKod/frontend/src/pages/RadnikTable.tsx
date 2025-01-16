import React, { useState, useEffect } from "react";
import "./../styles/RadnikTable.css";

type Radnik = {
  id: number;
  ime: string;
  prezime: string;
  pozicija: string;
};

const RadnikTable: React.FC = () => {
  const [radnici, setRadnici] = useState<Radnik[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRadnik, setNewRadnik] = useState<Omit<Radnik, "id">>({
    ime: "",
    prezime: "",
    pozicija: "",
  });

  // Dohvaćanje svih radnika
  useEffect(() => {
    fetch("http://localhost:8080/api/radnici/all")
      .then((response) => response.json())
      .then((data) => setRadnici(data))
      .catch((error) => console.error("Error fetching radnici:", error));
  }, []);

  // Dodavanje novog radnika
  const handleAddRadnik = (event: React.FormEvent) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/radnici/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRadnik),
    })
      .then((response) => response.json())
      .then((createdRadnik) => {
        setRadnici((prevRadnici) => [...prevRadnici, createdRadnik]);
        setNewRadnik({ ime: "", prezime: "", pozicija: "" });
        setShowForm(false);
      })
      .catch((error) => console.error("Error adding radnik:", error));
  };

  // Brisanje radnika
  const handleDeleteRadnik = (id: number) => {
    fetch(`http://localhost:8080/api/radnici/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRadnici((prevRadnici) =>
          prevRadnici.filter((radnik) => radnik.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting radnik:", error));
  };

  return (
    <div className="radnik-container">
      <h1 className="title">Popis Radnika</h1>
      <button
        className="add-button"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Odustani" : "Dodaj Radnika"}
      </button>

      {showForm && (
        <form className="add-radnik-form" onSubmit={handleAddRadnik}>
          <div className="form-group">
            <label>Ime:</label>
            <input
              type="text"
              value={newRadnik.ime}
              onChange={(e) =>
                setNewRadnik((prev) => ({ ...prev, ime: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Prezime:</label>
            <input
              type="text"
              value={newRadnik.prezime}
              onChange={(e) =>
                setNewRadnik((prev) => ({ ...prev, prezime: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Pozicija:</label>
            <input
              type="text"
              value={newRadnik.pozicija}
              onChange={(e) =>
                setNewRadnik((prev) => ({ ...prev, pozicija: e.target.value }))
              }
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Dodaj
          </button>
        </form>
      )}

      <table className="radnik-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Pozicija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {radnici.map((radnik) => (
            <tr key={radnik.id}>
              <td>{radnik.id}</td>
              <td>{radnik.ime}</td>
              <td>{radnik.prezime}</td>
              <td>{radnik.pozicija}</td>
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