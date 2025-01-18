// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationHeader from "./pages/NavigationHeader";
import NalogTable from "./pages/NalogTable";
import NalogDetails from "./pages/NalogDetails";
import StavkaNalogaDetails from "./pages/StavkaNalogaDetails";
import StavkaNalogaForm from "./pages/StavkaNalogaForm";
import LoginPage from "./pages/LoginPage";
import BrojiloTable from "./pages/BrojiloTable"; // Nova stranica za brojila
import KupacTable from "./pages/KupacTable";
import RadnikTable from "./pages/RadnikTable";
import RadnikSelectorForm from "./pages/RadnikSelectorForm";
import RadnikTasks from "./pages/RadnikTasks";
import TaskDetail from "./pages/TaskDetail";
import { AuthProvider } from "./pages/loginScripts/AuthContext";


const App: React.FC = () => {
  return (
    <AuthProvider>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/BrojiloTable" element={<BrojiloTable />} /> {/* Nova ruta */}
          <Route path="/RadnikTasks" element={<RadnikTasks />} /> {/* Nova ruta */}
          <Route path="/TaskDetail/:nalogId" element={<TaskDetail />} />
        </Routes>
      </div>
      </Router>
      </AuthProvider>
  );
};

export default App;
