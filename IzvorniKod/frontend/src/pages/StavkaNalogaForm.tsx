import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Brojilo = {
  id: number;
  serijskiBrojBrojilo: string;
  tipBrojila: string;
  adresa: string;
};

const BrojiloSelectorForm = () => {
  const [brojila, setBrojila] = useState<Brojilo[]>([]);
  const [selectedBrojiloId, setSelectedBrojiloId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBrojila = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/brojila/all');
        const data = response.data;

        if (Array.isArray(data)) {
          setBrojila(data);
        } else {
          console.error('API did not return an array:', data);
          setBrojila([]);
        }
      } catch (error) {
        console.error('Error fetching brojila:', error);
        setBrojila([]);
      }
    };

    fetchBrojila();
  }, []);

  const handleSelection = (id: number) => {
    setSelectedBrojiloId(id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedBrojiloId) {
      alert(`Selected Brojilo ID: ${selectedBrojiloId}`);
    } else {
      alert('Please select a brojilo.');
    }
  };

  return (
    <div className="brojilo-selector-form">
      <h2>Select a Brojilo</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BrojiloSelectorForm;
