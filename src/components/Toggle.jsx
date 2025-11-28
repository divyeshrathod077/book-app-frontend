// src/components/Toggle.jsx
import React from 'react';
import useTheme from '../hooks/useTheme';
import './Toggle.css';

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-switch" aria-label="Toggle theme">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-checked={theme === 'dark'}
      />
      <span className="slider" />
    </label>
  );
};

export default Toggle;


