import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    const logout = () => {
        localStorage.removeItem('token'); // Uklonite token
        localStorage.removeItem('role'); // Uklonite ulogu
        setRole(null); // Resetirajte stanje
    };

    return (
        <AuthContext.Provider value={{ role, setRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
