import React from "react";
import { Link } from "react-router-dom";
import "./../styles/NavigationHeader.css"; // Stiliziranje headera
import { useAuth } from "./loginScripts/AuthContext";

const NavigationHeader: React.FC = () => {
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Preusmjeravanje nakon logouta
  };

  return (
    <header className="navigation-header">
      <nav>
        <ul>
          {role === "admin" && (
            <>
              <li>
                <Link to="/">Nalozi</Link>
              </li>
              <li>
                <Link to="/kupci">Kupci</Link>
              </li>
              <li>
                <Link to="/radnici">Radnici</Link>
              </li>
              <li>
                <Link to="/BrojiloTable">Brojila</Link>
              </li>
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
