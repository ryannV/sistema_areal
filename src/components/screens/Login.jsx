import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/areal-logo-sf.png";
import lock from "../../assets/cadeado.png";
import user from "../../assets/usuario.png";
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services';
import styles from "./Login.module.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!usuario || !senha) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const data = await authService.login(usuario, senha);
      const success = login(data.token);
      
      if (success) {
        navigate("/main");
      } else {
        setErro("Erro ao processar o token de autenticação");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro(
        error.response?.data?.message || 
        "Erro ao conectar com o servidor. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_second}>
        <img src={logo} alt="logo" className={styles.logo} />

        {/* Campo de usuário */}
        <div className={styles.campos}>
          <img src={user} alt="user" className={styles.icons} />
          <input
            className={styles.input}
            type="text"
            placeholder="Digite seu Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        {/* Campo de senha */}
        <div className={styles.campos}>
          <img src={lock} alt="lock" className={styles.icons} />
          <input
            className={styles.input}
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        {/* Mensagem de erro */}
        {erro && <p className={styles.erro}>{erro}</p>}

        {/* Botão de login */}
        <div className={styles.submit}>
          <button 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
