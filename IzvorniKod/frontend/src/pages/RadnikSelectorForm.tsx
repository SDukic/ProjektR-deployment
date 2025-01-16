import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Radnik = {
  id: number;
  imeRadnik: string;
  prezimeRadnik: string;
  telefonRadnik: string;
};

const RadnikSelectorForm = () => {
  const [radnici, setRadnici] = useState<Radnik[]>([]);
  const [selectedRadnikId, setSelectedRadnikId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { nalogId } = useParams<{ nalogId: string }>();
  const navigate = useNavigate();

  // Fetch the list of Radnici from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/radnici/all")
      .then((response) => setRadnici(response.data))
      .catch((err) => setError("Failed to load radnici. Please try again."));
  }, []);

  // Handle Radnik selection
  const handleSelection = (id: number) => {
    setSelectedRadnikId(id);
  };

  // Submit the selected Radnik ID to the backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedRadnikId) {
      alert("Please select a radnik.");
      return;
    }

    if (!nalogId) {
      alert("Nalog ID is missing.");
      return;
    }

    try {
      const payload = { idNalog: Number(nalogId), idRadnik: selectedRadnikId };
      await axios.post("http://localhost:8080/api/nalozi/radnik", payload);
      alert("Radnik successfully assigned to the Nalog!");
      navigate(`/NalogDetails/${nalogId}`);
    } catch (err) {
      console.error("Error assigning radnik:", err);
      alert("Failed to assign radnik. Please try again.");
    }
  };

  return (
    <div className="radnik-selector-form">
      <h2>Dodaj Radnika</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {radnici.length === 0 ? (
          <p>Učitavanje radnika...</p>
        ) : (
          <ul className="radnici-list">
            {radnici.map((radnik) => (
              <li key={radnik.id} className="radnik-item">
                <label>
                  <input
                    type="radio"
                    name="radnik"
                    value={radnik.id}
                    onChange={() => handleSelection(radnik.id)}
                  />
                  {`Ime: ${radnik.imeRadnik}, Prezime: ${radnik.prezimeRadnik}, Telefon: ${radnik.telefonRadnik}`}
                </label>
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Dodaj"}
        </button>
      </form>
    </div>
  );
};

export default RadnikSelectorForm;
