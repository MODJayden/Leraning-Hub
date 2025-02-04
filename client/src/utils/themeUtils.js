// src/utils/themeUtils.js
export const saveThemePreference = (theme) => {
    localStorage.setItem("theme", theme);
  };
  
  export const getThemePreference = () => {
    return localStorage.getItem("theme") || "light"; // Default to light mode
  };