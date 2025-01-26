import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button onClick={() => navigate('/NalogTable')} className="dashboard-button">
          Nalozi
        </button>
        <button onClick={() => navigate('/kupci')} className="dashboard-button">
          Kupci
        </button>
        <button onClick={() => navigate('/radnici')} className="dashboard-button">
          Radnici
        </button>
        <button onClick={() => navigate('/BrojiloTable')} className="dashboard-button">
          Brojila
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;