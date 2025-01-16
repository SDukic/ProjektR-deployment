import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Brojilo = {
  id: number;
  serijskiBrojBrojilo: string;
  tipBrojila: string;
  adresa: string;
};

const BrojiloSelectorForm = () => {
  const [brojila, setBrojila] = useState<Brojilo[]>([]);
  const [selectedBrojiloId, setSelectedBrojiloId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { nalogId } = useParams<{ nalogId: string }>();
  const navigate = useNavigate();

  // Fetch the list of Brojila from the API
  useEffect(() => {
    const fetchBrojila = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/brojila/all");
        const data = response.data;

        if (Array.isArray(data)) {
          setBrojila(data);
        } else {
          console.error("API did not return an array:", data);
          setBrojila([]);
        }
      } catch (error) {
        console.error("Error fetching brojila:", error);
        setError("Failed to load brojila. Please try again later.");
      }
    };

    fetchBrojila();
  }, []);

  // Handle Brojilo selection
  const handleSelection = (id: number) => {
    setSelectedBrojiloId(id);
  };

  // Submit the selected Brojilo ID and Nalog ID to the backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedBrojiloId) {
      alert("Please select a brojilo.");
      return;
    }
  
    if (!nalogId) {
      alert("Nalog ID is missing.");
      return;
    }
  
    try {
      const payload = {
        idNalog: Number(nalogId), // Ensure it's a number
        idBrojilo: selectedBrojiloId, // Ensure this is a number too
      };
  
      await axios.post("http://localhost:8080/api/stavkenaloga/create", payload);
      alert("Stavka Naloga created successfully!");
      navigate(`/NalogDetails/${nalogId}`)
    } catch (error) {
      console.error("Error creating Stavka Naloga:", error);
      alert("Failed to create Stavka Naloga. Please try again.");
    }
  };

  return (
    <div className="brojilo-selector-form">
      <h2>Select a Brojilo</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {brojila.length === 0 ? (
          <p>Učitavanje brojila...</p>
        ) : (
          <ul className="brojila-list">
            {brojila.map((brojilo) => (
              <li key={brojilo.id} className="brojilo-item">
                <label>
                  <input
                    type="radio"
                    name="brojilo"
                    value={brojilo.id}
                    onChange={() => handleSelection(brojilo.id)}
                  />
                  {`Serijski Broj: ${brojilo.serijskiBrojBrojilo}, Tip: ${brojilo.tipBrojila}, Adresa: ${brojilo.adresa}`}
                </label>
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BrojiloSelectorForm;
