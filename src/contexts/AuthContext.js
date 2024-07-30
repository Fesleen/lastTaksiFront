import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [telegramId, setTelegramId] = useState(null);

    const login = (id) => {
        setIsAuthenticated(true);
        setTelegramId(id);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setTelegramId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, telegramId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
