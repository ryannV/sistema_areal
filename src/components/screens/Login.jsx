import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/areal-logo-sf.png";
import user from "../../assets/usuario.png";
import lock from "../../assets/cadeado.png";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Correção: usa o método login do AuthContext

  const handleLogin = async () => {
    setLoading(true);     // Inicia loading
    setErro("");          // Limpa erro anterior
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        const decoded = jwtDecode(token);
        const role =
          decoded["role"] ||
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // Atualiza o contexto de autenticação
        login(token, role);

        // Redireciona para a rota principal
        navigate("/main");
      } else {
        setErro(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro com o servidor, tente mais tarde.");
    } finally {
      setLoading(false); // Sempre para o loading no final
    }
  };

  const handleUsuario = (e) => {
    setUsuario(e.target.value);
    setErro("");
  }

  const handleSenha = (e) => {
    setSenha(e.target.value);
    setErro("");
  }

  const handleEnter = async (e) => {
    if ((e.key !== "Enter")) return;
    handleLogin();
  }

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
            onChange={handleUsuario}
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
            onChange={handleSenha}
            onKeyUp={handleEnter}
          />
        </div>

        {/* Mensagem de erro ou loading */}
        <span className={`${styles.erro} ${(erro || loading) ? '' : styles.oculto}`}>
          {loading ? <span className={styles.loader}></span> : erro}
        </span>

        {/* Botão de login */}
        <div className={styles.submit}>
          <button onClick={handleLogin}>Acessar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
