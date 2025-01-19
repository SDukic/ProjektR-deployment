import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationHeader from "./pages/NavigationHeader";
import NalogTable from "./pages/NalogTable";
import NalogDetails from "./pages/NalogDetails";
import StavkaNalogaDetails from "./pages/StavkaNalogaDetails";
import StavkaNalogaForm from "./pages/StavkaNalogaForm";
import LoginPage from "./pages/LoginPage";
import BrojiloTable from "./pages/BrojiloTable";
import KupacTable from "./pages/KupacTable";
import RadnikTable from "./pages/RadnikTable";
import RadnikSelectorForm from "./pages/RadnikSelectorForm";
import RadnikTasks from "./pages/RadnikTasks";
import TaskDetail from "./pages/TaskDetail";
import { AuthProvider, useAuth } from "./pages/loginScripts/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { role } = useAuth();

  // Ako je uloga "radnik", spriječavamo pristup rutama koje nisu vezane za njega
  if (role === "radnik") {
    return <Navigate to="/login" />;
  }

  return children; // Ako je admin, dopuštamo pristup
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavigationHeader />
        <div className="content">
          <Routes>
            {/* Routes accessible by anyone, including radnik */}
            <Route path="/login" element={<LoginPage />} />

            {/* Routes accessible only by admin */}
            <Route path="/" element={<ProtectedRoute><NalogTable /></ProtectedRoute>} />
            <Route path="/NalogTable" element={<ProtectedRoute><NalogTable /></ProtectedRoute>} />
            <Route path="/NalogDetails/:nalogId" element={<ProtectedRoute><NalogDetails /></ProtectedRoute>} />
           
            <Route path="/StavkaNalogaForm/:nalogId" element={<ProtectedRoute><StavkaNalogaForm /></ProtectedRoute>} />
            <Route path="/kupci" element={<ProtectedRoute><KupacTable /></ProtectedRoute>} />
            <Route path="/radnici" element={<ProtectedRoute><RadnikTable /></ProtectedRoute>} />
            <Route path="/RadnikSelectorForm/:nalogId" element={<ProtectedRoute><RadnikSelectorForm /></ProtectedRoute>} />
            <Route path="/BrojiloTable" element={<ProtectedRoute><BrojiloTable /></ProtectedRoute>} />
            
            {/* Radnik can access these routes */}
            <Route path="/RadnikTasks" element={<RadnikTasks />} />
            <Route path="/TaskDetail/:nalogId" element={<TaskDetail />} />
            <Route path="/StavkaNalogaDetails/:stavkaId" element={<StavkaNalogaDetails />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
