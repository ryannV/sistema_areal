import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/areal-logo-sf.png";
import user from "../../assets/usuario.png";
import lock from "../../assets/cadeado.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.container_second}>
        <img src={logo} alt="logo" className={styles.logo}/>

        <div className={styles.campos}>
          <img src={user} alt="user" className={styles.icons}/>
          <input type="text" placeholder="Digite seu Usuário" />
        </div>

        <div className={styles.campos}>
          <img src={lock} alt="lock" className={styles.icons}/>
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
