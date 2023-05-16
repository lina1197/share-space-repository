import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useState(null);

  const setAuthHeaders = (newHeaders) => {
    setHeaders(newHeaders);
  };

  const value = {
    user,
    setUser,
    headers,
    setAuthHeaders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
