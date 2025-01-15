import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NalogTable from "./pages/NalogTable";
import NalogDetails from "./pages/NalogDetails";
import StavkaNalogaDetails from "./pages/StavkaNalogaDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NalogTable />} />
        <Route path="/NalogDetails/:nalogId" element={<NalogDetails />} />
        <Route path="/StavkaNalogaDetails/:stavkaId" element={<StavkaNalogaDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
