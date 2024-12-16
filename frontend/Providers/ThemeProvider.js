import { createContext, useState } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setDarkTheme] = useState(false);

    return (
      <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
          {children}
      </ThemeContext.Provider>
    );
}

