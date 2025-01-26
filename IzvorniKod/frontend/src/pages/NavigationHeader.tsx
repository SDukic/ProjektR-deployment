import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../styles/NavigationHeader.css';
import { useAuth } from './loginScripts/AuthContext';

const NavigationHeader: React.FC = () => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const isAdminDashboard = location.pathname === '/';

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="navigation-header">
      <nav>
        <ul>
          {role === 'admin' && (
            <>
              {location.pathname !== '/NalogTable' && (
                <li>
                  <Link to="/NalogTable">Nalozi</Link>
                </li>
              )}
              {location.pathname !== '/kupci' && (
                <li>
                  <Link to="/kupci">Kupci</Link>
                </li>
              )}
              {location.pathname !== '/radnici' && (
                <li>
                  <Link to="/radnici">Radnici</Link>
                </li>
              )}
              {location.pathname !== '/BrojiloTable' && (
                <li>
                  <Link to="/BrojiloTable">Brojila</Link>
                </li>
              )}
            </>
          )}
          {role && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
          {!role && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;
