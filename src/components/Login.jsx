import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/areal-logo-sf.png";


const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.container_second}>
        <img src={logo} alt="logo" />

        <div className={styles.campos}>
          <h3>Icon</h3>
          <input type="text" placeholder="Digite seu Usuário" />
        </div>

        <div className={styles.campos}>
          <h3>Icon</h3>
          <input type="password" placeholder="Digite sua Senha" />
        </div>

        <div className={styles.submit}>
          <button onClick={() => navigate('/main')}>Acessar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
