import React, { useState } from 'react';
import 'flowbite/toggle/dist/toggle.css';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkModePreference', newDarkModeState.toString());
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="toggle">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="toggle-input"
        />
        <span className="toggle-label">Dark Mode</span>
        <span className="toggle-content">
          <span className={`toggle-icon ${isDarkMode ? 'text-gray-800' : 'text-gray-100'}`}>
            🌙
          </span>
          <span className={`toggle-icon ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            ☀️
          </span>
        </span>
      </label>
    </div>
  );
}

export default DarkModeToggle;