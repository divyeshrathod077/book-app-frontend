// src/hooks/useTheme.js
import { useEffect, useState } from 'react';

export default function useTheme() {
  // initialize from localStorage or from current html attribute
  const getInitial = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'dark' || attr === 'light') return attr;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitial);

  // apply theme to <html>, color-scheme, and localStorage
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme; // helps scrollbars / form controls
      localStorage.setItem('theme', theme);
    } catch (e) { /* ignore on SSR or security-limited env */ }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
