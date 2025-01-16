import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NalogTable from "./pages/NalogTable";
import NalogDetails from "./pages/NalogDetails";
import StavkaNalogaDetails from "./pages/StavkaNalogaDetails";
import StavkaNalogaForm from "./pages/StavkaNalogaForm";

import BrojiloTable from "./pages/BrojiloTable"; // Nova stranica za brojila

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NalogTable />} />
        <Route path="/NalogDetails/:nalogId" element={<NalogDetails />} />
        <Route path="/StavkaNalogaDetails/:stavkaId" element={<StavkaNalogaDetails />} />
        <Route path="/StavkaNalogaForm/:nalogId" element={<StavkaNalogaForm />} />
        
        <Route path="/BrojiloTable" element={<BrojiloTable />} /> {/* Nova ruta */}
      </Routes>
    </Router>
  );
};

export default App;
