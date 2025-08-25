import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { mtgThemes } from '../themes/mtgThemes'; // Import mtgThemes

const themes = mtgThemes; // Use the imported mtgThemes array

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div className="p-4 bg-card-background rounded-lg shadow-md">
      <label htmlFor="theme-select" className="block text-text-primary text-lg font-semibold mb-2">
        Select Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="w-full p-2 border border-input-border rounded-md bg-input-bg text-text-primary focus:outline-none focus:border-accent"
      >
        {themes.map((t) => (
          <option key={t.value} value={t.value}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
