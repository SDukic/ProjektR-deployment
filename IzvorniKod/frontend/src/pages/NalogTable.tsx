import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/NalogTable.css";


type Nalog = {
  id: number;
  datumNalog: string;
  statusNalog: string;
};

const NalogTable: React.FC = () => {
  const [nalozi, setNalozi] = useState<Nalog[]>([]);
  const navigate = useNavigate();

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
      const nalogpr = await response.json();


      let updatedStatus = "null";
      console.log(nalogpr.statusNalog);

      if (nalogpr.statusNalog === "Aktivan") {
        updatedStatus = "Završen"
      } else {
        updatedStatus = "Aktivan"
      }

      console.log(updatedStatus);

      // Ažuriraj nalog
      const updatedNalog = { ...nalogpr, statusNalog: updatedStatus };

      await fetch(`http://localhost:8080/api/nalozi/update/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedStatus,
      });



      alert(`Status naloga ${id} uspješno promijenjen na "${updatedStatus}".`);
      navigate(0);
    } catch (error) {
      console.error("Error updating nalog:", error);
      alert("Došlo je do pogreške prilikom ažuriranja naloga.");
    }
  };

  const handleCreateNalog = () => {
    const newNalog = {
      datumNalog: new Date().toISOString(), // Postavi trenutni datum i vrijeme u ISO formatu
      statusNalog: "Aktivan" // Postavi status na "Aktivan"
    };

    fetch("http://localhost:8080/api/nalozi/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNalog)
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text) });
        }
        return response.json();
      })
      .then((createdNalog) => {
        setNalozi((prevNalozi) => [...prevNalozi, createdNalog]);
        navigate(`/NalogDetails/${createdNalog.id}`); // Navigiraj na stranicu s detaljima novog naloga
      })
      .catch((error) => console.error("Error creating nalog:", error));
  };

  const handleDeleteNalog = (id: number) => {
    fetch(`http://localhost:8080/api/nalozi/delete/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text) });
        }
        setNalozi((prevNalozi) => prevNalozi.filter((nalog) => nalog.id !== id));
      })
      .catch((error) => console.error("Error deleting nalog:", error));
  };

  return (
    <div className="nalog-container">
      <h1 className="title">Popis Naloga</h1>
      <button onClick={handleCreateNalog} className="create-nalog-button">
        Kreiraj Novi Nalog
      </button>
      <button onClick={() => navigate("/BrojiloTable")} className="create-brojilo-button">
        Dodaj Novo Brojilo
      </button>
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
                <button
                  onClick={() => handleDeleteNalog(nalog.id)}
                  className="delete-nalog-button"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: nalog.statusNalog === "Završen" ? "red" : "grey",
                    color: "white",
                    cursor: nalog.statusNalog === "Završen" ? "pointer" : "not-allowed"
                  }}
                  disabled={nalog.statusNalog !== "Završen"}
                >
                  Obriši Nalog
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
