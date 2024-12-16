// GlobalState.js
import React, { createContext, useState } from 'react';

// Create the Context
export const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [pred, setPred] = useState(null); // Global state

  return (
    <GlobalContext.Provider value={{ pred, setPred }}>
      {children}
    </GlobalContext.Provider>
  );
};
