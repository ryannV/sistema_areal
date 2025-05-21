import React, { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

// Cria o contexto
const AuthContext = createContext();

// Provider que envolve sua aplicação
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Função para login
  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      console.log("Token decodificado no login:", decoded);

      let funcao = null;

      if (decoded["funcao"]) {
        funcao = decoded["funcao"];
      } else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        funcao = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      } else {
        console.warn("⚠️ Claim 'funcao' não encontrada no token!");
      }

      console.log("Função do usuário no login:", funcao);
      setUsuario({ ...decoded, funcao });
    } catch (error) {
      console.error("Erro ao decodificar o token no login:", error);
      logout();
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  // Verifica token ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado no useEffect:", decoded);

        let funcao = null;

        if (decoded["funcao"]) {
          funcao = decoded["funcao"];
        } else if (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
          funcao = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        } else {
          console.warn("⚠️ Claim 'funcao' não encontrada no token!");
        }

        console.log("Função do usuário no useEffect:", funcao);
        setUsuario({ ...decoded, funcao });
      } catch (error) {
        console.error("Erro ao decodificar o token no useEffect:", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => useContext(AuthContext);