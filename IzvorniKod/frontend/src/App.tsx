import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./pages/loginScripts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { role } = useAuth();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <NavigationHeader />}
      <div className="content">
        <Routes>
          {/* Routes accessible by anyone, including radnik */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes accessible only by admin */}
          <Route path="/" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/NalogTable" element={<ProtectedRoute allowedRoles={['admin', 'radnik']}><NalogTable /></ProtectedRoute>} />
          <Route path="/NalogDetails/:nalogId" element={<ProtectedRoute allowedRoles={['admin', 'radnik']}><NalogDetails /></ProtectedRoute>} />
          <Route path="/StavkaNalogaForm/:nalogId" element={<ProtectedRoute allowedRoles={['admin']}><StavkaNalogaForm /></ProtectedRoute>} />
          <Route path="/kupci" element={<ProtectedRoute allowedRoles={['admin']}><KupacTable /></ProtectedRoute>} />
          <Route path="/radnici" element={<ProtectedRoute allowedRoles={['admin']}><RadnikTable /></ProtectedRoute>} />
          <Route path="/RadnikSelectorForm/:nalogId" element={<ProtectedRoute allowedRoles={['admin']}><RadnikSelectorForm /></ProtectedRoute>} />
          <Route path="/BrojiloTable" element={<ProtectedRoute allowedRoles={['admin']}><BrojiloTable /></ProtectedRoute>} />
          <Route path="/StavkaNalogaDetails/:stavkaId" element={<ProtectedRoute allowedRoles={['admin', 'radnik']}><StavkaNalogaDetails /></ProtectedRoute>} />

          {/* Radnik can access these routes */}
          <Route path="/RadnikTasks" element={<ProtectedRoute allowedRoles={['radnik']}><RadnikTasks /></ProtectedRoute>} />
          <Route path="/TaskDetail/:nalogId" element={<ProtectedRoute allowedRoles={['radnik']}><TaskDetail /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
