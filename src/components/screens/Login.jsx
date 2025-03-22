import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/areal-logo-sf.png";
import user from "../../assets/usuario.png";
import lock from "../../assets/cadeado.png";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(""); // Estado para armazenar o nome de usuário
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha
  const [erro, setErro] = useState(""); // Estado para exibir mensagens de erro

  const handleLogin = async () => {
    try {
      // Faz a requisição para o endpoint de login no back-end
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }), // Envia o usuário e a senha no corpo da requisição
      });

      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) {
        // Se a resposta for bem-sucedida, redireciona para a página principal
        navigate("/main");
      } else {
        // Se houver erro, exibe a mensagem de erro retornada pelo back-end
        setErro(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      // Captura erros de rede ou outros erros inesperados
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
            type="text"
            placeholder="Digite seu Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)} // Atualiza o estado do usuário
          />
        </div>

        {/* Campo de senha */}
        <div className={styles.campos}>
          <img src={lock} alt="lock" className={styles.icons} />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
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