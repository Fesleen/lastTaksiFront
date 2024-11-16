import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isBlue, setIsBlue] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = isBlue ? '#070038' : 'white';
    }, [isBlue]);

    const toggleTheme = () => {
        setIsBlue(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isBlue, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);