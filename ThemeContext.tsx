import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  backgroundColor: '#e0e0e0',
  textColor: '#333',
  buttonColor: '#4A90E2',
  buttonTextColor: '#ffffff',
};

const darkTheme = {
  backgroundColor: '#333',
  textColor: '#ffffff',
  buttonColor: '#4A90E2',
  buttonTextColor: '#ffffff',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { lightTheme, darkTheme };
