import React, { createContext, useState } from 'react';

// Create the Context
export const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [pred, setPred] = useState(null); // Global state
  const [loading, setLoading] = useState(false); // Loading state

  const scrollToSection = (index) => {
      const container = document.querySelector('.scroll-container');
      const sectionWidth = window.innerWidth; // Width of one section
      if (index === 1) {
        index = 0.5; // Scroll half of the section width if index is 1
      }
      if(index === 2) {
        index = 1.5; // Scroll one section width if index is 2
      }
      container.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth', // Smooth scrolling
      });
    };

  return (
    <GlobalContext.Provider value={{ pred, setPred, loading, setLoading, scrollToSection }}>
      {children}
    </GlobalContext.Provider>
  );
};
