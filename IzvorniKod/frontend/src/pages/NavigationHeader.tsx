// NavigationHeader.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./../styles/NavigationHeader.css"; // Stiliziranje headera

const NavigationHeader: React.FC = () => {
  return (
    <header className="navigation-header">
      <nav>
        <ul>
          <li>
            <Link to="/">Nalozi</Link>
          </li>
          <li>
            <Link to="/kupci">Kupci</Link>
          </li>
          <li>
            <Link to="/radnici">Radnici</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;
