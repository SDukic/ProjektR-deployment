// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationHeader from "./pages/NavigationHeader";
import NalogTable from "./pages/NalogTable";
import NalogDetails from "./pages/NalogDetails";
import StavkaNalogaDetails from "./pages/StavkaNalogaDetails";
import StavkaNalogaForm from "./pages/StavkaNalogaForm";

import BrojiloTable from "./pages/BrojiloTable"; // Nova stranica za brojila
import KupacTable from "./pages/KupacTable";
import RadnikTable from "./pages/RadnikTable";
import RadnikSelectorForm from "./pages/RadnikSelectorForm";


const App: React.FC = () => {
  return (
    <Router>
      <NavigationHeader /> {/* Uključujemo navigacijski header */}
      <div className="content">
        <Routes>
          <Route path="/" element={<NalogTable />} />
          <Route path="/NalogDetails/:nalogId" element={<NalogDetails />} />
          <Route path="/StavkaNalogaDetails/:stavkaId" element={<StavkaNalogaDetails />} />
          <Route path="/StavkaNalogaForm/:nalogId" element={<StavkaNalogaForm />} />
          <Route path="/kupci" element={<KupacTable />} />
          <Route path="/radnici" element={<RadnikTable />} />
          <Route path="/RadnikSelectorForm/:nalogId" element={<RadnikSelectorForm />} />
        </Routes>
      </div>
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
