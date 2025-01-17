import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Pohrana korisničkih podataka

    const login = (userData) => setUser(userData);  // Funkcija za prijavu korisnika
    const logout = () => setUser(null);  // Funkcija za odjavu korisnika

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
