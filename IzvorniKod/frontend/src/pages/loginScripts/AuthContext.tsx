import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthContextType = {
  role: string | null;
  radnikId: number | null;
  login: (role: string, radnikId?: number) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [radnikId, setRadnikId] = useState<number | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedRadnikId = localStorage.getItem('radnikId');
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedRadnikId) {
      setRadnikId(parseInt(storedRadnikId, 10));
    }
  }, []);

  const login = (userRole: string, radnikId?: number) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
    if (userRole === 'radnik' && radnikId) {
      setRadnikId(radnikId);
      localStorage.setItem('radnikId', radnikId.toString());
    }
  };

  const logout = () => {
    setRole(null);
    setRadnikId(null);
    localStorage.removeItem('role');
    localStorage.removeItem('radnikId');
  };

  return (
    <AuthContext.Provider value={{ role, radnikId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
