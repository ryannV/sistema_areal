import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services';

// Cria o contexto
const AuthContext = createContext();

// Provider que envolve sua aplicação
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para login
  const login = (token) => {
    try {
      authService.setTokenInStorage(token);
      const usuarioDecodificado = authService.decodeToken(token);
      
      if (usuarioDecodificado) {
        setUsuario(usuarioDecodificado);
        return true;
      }
      
      logout();
      return false;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      logout();
      return false;
    }
  };

  // Função para logout
  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  // Verifica token ao carregar a aplicação
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const token = authService.getTokenFromStorage();
          const usuarioDecodificado = authService.decodeToken(token);
          if (usuarioDecodificado) {
            setUsuario(usuarioDecodificado);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Você pode substituir por um componente de loading
  }

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      login, 
      logout,
      isAuthenticated: !!usuario 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};