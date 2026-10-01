/**
 * @file components/Navbar/MusicButton.jsx
 * Why this code exists:
 * Controls the active light/dark color theme by persisting preferences in localStorage
 * and toggling the data-theme attribute on documentElement.
 */

"use client";
import React, { useEffect, useState } from 'react';

/**
 * Sun SVG icon for dark mode state representation.
 * @returns {React.ReactElement} Sun SVG icon
 */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-15.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2m-13.66 5.66-1.41 1.41m14.14-14.14-1.41 1.41"/>
  </svg>
);

/**
 * Moon SVG icon for light mode state representation.
 * @returns {React.ReactElement} Moon SVG icon
 */
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/**
 * ThemeButton component toggles dark/light theme mode state.
 * 
 * Tricky logic:
 * Reads document.documentElement.dataset.theme on mount to stay in sync with
 * inline theme bootstrapping script in layout.js, avoiding hydrations mismatch.
 * 
 * TODO: Support system preference change listeners (prefers-color-scheme).
 * 
 * @returns {React.ReactElement} Theme toggle button component
 */
const ThemeButton = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);
  }, []);

  /**
   * Toggles theme state and syncs document element attribute + localStorage.
   */
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = next;
    }
    try { localStorage.setItem('theme', next); } catch (e) {}
  };

  const isDark = theme === 'dark';

  return (
    <button type="button" onClick={toggle} className='nav_btn_lg nav_btn_light flex items-center justify-center hover:bg-brblue py-6 cursor-pointer'>
      {isDark ? <SunIcon /> : <MoonIcon />}
      {isDark ? 'LIGHT' : 'DARK'}
    </button>
  );
};

export default ThemeButton;
