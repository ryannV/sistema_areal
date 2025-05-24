import { jwtDecode } from 'jwt-decode';
import api from '../api';

// Constantes
const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY || 'token';

// Funções de manipulação do token
const getTokenFromStorage = () => localStorage.getItem(TOKEN_KEY);

const setTokenInStorage = (token) => localStorage.setItem(TOKEN_KEY, token);

const removeTokenFromStorage = () => localStorage.removeItem(TOKEN_KEY);

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const funcao = decoded["funcao"] || 
                  decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 
                  null;
    
    if (!funcao) {
      console.warn("⚠️ Claim 'funcao' não encontrada no token!");
    }

    return { ...decoded, funcao };
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

// Funções de autenticação
const login = async (usuario, senha) => {
  try {
    const { data } = await api.post('/auth/login', { usuario, senha });
    return data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

const logout = () => {
  removeTokenFromStorage();
};

const isAuthenticated = () => {
  const token = getTokenFromStorage();
  if (!token) return false;
  
  try {
    const decoded = decodeToken(token);
    return !!decoded;
  } catch {
    return false;
  }
};

export const authService = {
  login,
  logout,
  isAuthenticated,
  getTokenFromStorage,
  setTokenInStorage,
  removeTokenFromStorage,
  decodeToken
}; 