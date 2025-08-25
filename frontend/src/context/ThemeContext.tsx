import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<string>(() => {
    // Initialize theme from localStorage or default to 'dark' (or 'light' if preferred)
    const storedTheme = localStorage.getItem('mtg-theme');
    return storedTheme || 'dark'; // Default to dark mode if no theme is stored
  });

  useEffect(() => {
    // Apply the theme class to the html element
    const htmlElement = document.documentElement;
    // Remove all existing theme classes to ensure only one is active
    htmlElement.className = ''; // Clear existing classes
    htmlElement.classList.add(theme); // Add the current theme class

    // Persist the theme to localStorage
    localStorage.setItem('mtg-theme', theme);
  }, [theme]);

  const setTheme = (themeName: string) => {
    setThemeState(themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
