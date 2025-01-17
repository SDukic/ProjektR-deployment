import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UnosPodataka from './UnosPodataka';
import TableComponent from './TableComponent'; // Uvezi novu komponentu

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Unos podataka</Link>
                        </li>
                        <li>
                            <Link to="/prikaz">Prikaz podataka</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<UnosPodataka />} />
                    <Route path="/prikaz" element={<TableComponent />} /> {/* Ovdje je TableComponent */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
