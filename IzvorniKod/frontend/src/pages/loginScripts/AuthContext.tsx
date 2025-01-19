import React, { createContext, useContext, useState, ReactNode } from 'react';




type AuthContextType = {
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
  login: (role: string) => void;  // Funkcija za postavljanje role prilikom prijave
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (role: string) => {
    localStorage.setItem("role", role);  // Pohranjivanje role u localStorage
    setRole(role);  // Postavljanje role u stanje
  };

  const logout = () => {
    localStorage.removeItem("token"); // Uklonite token
    localStorage.removeItem("role"); // Uklonite ulogu
    setRole(null); // Resetirajte stanje
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
