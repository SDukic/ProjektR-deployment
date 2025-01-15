import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StavkaNalogaForm.css';

// Define Brojilo type
/**
 * Brojilo type definition
 */
type Brojilo = {
  id: number;
  serijskiBrojBrojilo: string;
  tipBrojila?: string;
  adresa?: string;
};

const StavkaNalogaForm = ({ nalogId, onSubmit }: { nalogId: number; onSubmit: (stavka: { idNalog: number; idBrojilo: number; }) => void; }) => {
  const [brojila, setBrojila] = useState<Brojilo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrojilo, setSelectedBrojilo] = useState<Brojilo | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch brojila from the API
  useEffect(() => {
    const fetchBrojila = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/brojila/all');
        setBrojila(response.data);
      } catch (error) {
        console.error('Error fetching brojila:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrojila();
  }, []);

  // Filter brojila based on search term
  const filteredBrojila = brojila.filter(brojilo => {
    const search = searchTerm.toLowerCase();
    return (
      brojilo.serijskiBrojBrojilo.toLowerCase().includes(search) ||
      (brojilo.tipBrojila || '').toLowerCase().includes(search) ||
      (brojilo.adresa || '').toLowerCase().includes(search)
    );
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedBrojilo) {
      const stavkaNaloga = {
        idNalog: nalogId,
        idBrojilo: selectedBrojilo.id
      };
      onSubmit(stavkaNaloga);
    } else {
      alert('Please select a brojilo.');
    }
  };

  return (
    <div className="stavka-naloga-form">
      <h2 className="form-title">Create Stavka Naloga</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="search" className="form-label">Search Brojila:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by serial number, type, or address"
            className="form-input"
          />
        </div>

        {loading ? (
          <p className="loading-text">Loading brojila...</p>
        ) : (
          <div className="brojila-list">
            <h3 className="list-title">Select Brojilo:</h3>
            <ul className="list-container">
              {filteredBrojila.map(brojilo => (
                <li key={brojilo.id} className="list-item">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="brojilo"
                      value={brojilo.id}
                      onChange={() => setSelectedBrojilo(brojilo)}
                      className="radio-input"
                    />
                    {`Serijski Broj: ${brojilo.serijskiBrojBrojilo}, Tip: ${brojilo.tipBrojila || 'N/A'}, Adresa: ${brojilo.adresa || 'N/A'}`}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default StavkaNalogaForm;
