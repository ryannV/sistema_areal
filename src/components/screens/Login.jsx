import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/areal-logo-sf.png";
import user from "../../assets/usuario.png";
import lock from "../../assets/cadeado.png";
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const role = decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        localStorage.setItem("role", role);

        navigate("/main");
      } else {
        setErro(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
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
          />
        </div>

        {/* Mensagem de erro */}
        {erro && <p className={styles.erro}>{erro}</p>}

        {/* Botão de login */}
        <div className={styles.submit}>
          <button onClick={handleLogin}>Acessar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
