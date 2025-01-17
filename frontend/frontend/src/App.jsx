import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NaloziPage from './components/NaloziPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/nalozi" element={<NaloziPage />} />
            </Routes>
        </Router>
    );
};

export default App;
