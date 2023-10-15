import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const backend = "https://back-end-personal-blog.vercel.app";

export const AuthProvider = ({ children }) => {
  // Inicialize o estado com base no valor armazenado no localStorage ou falso se não houver valor.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Quando o estado de isLoggedIn mudar, atualize o localStorage.
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);

    localStorage.removeItem("token");
  };

  const setAuthToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        setAuthToken,
        getAuthToken,
        backend
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
