<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/areal-logo-sf.png";
=======
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
>>>>>>> 99f6a195eb051b5d32415fa995171c77c2ffc7fe

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
<<<<<<< HEAD
      <div className={styles.container_second}>
        <img src={logo} alt="logo" />

        <div className={styles.campos}>
          <h3>Icon</h3>
          <input type="text" placeholder="Digite seu Usuário" />
=======
      <div>
        <h1 className={styles.title}>Titulo e Logo</h1>

        <div className={styles.campos}>
          <h3>Icon</h3>
          <input type="text" placeholder="Digite seu Usuário"/>
>>>>>>> 99f6a195eb051b5d32415fa995171c77c2ffc7fe
        </div>

        <div className={styles.campos}>
          <h3>Icon</h3>
<<<<<<< HEAD
          <input type="password" placeholder="Digite sua Senha" />
        </div>

        <div className={styles.submit}>
          <button onClick={() => navigate("/main")}>Acessar</button>
=======
          <input type="password" placeholder='Digite sua Senha'/>
        </div>

        <div className={styles.submit}>
          <button onClick={() => navigate('/main')}>Acessar</button>
>>>>>>> 99f6a195eb051b5d32415fa995171c77c2ffc7fe
        </div>
      </div>
    </div>
  );
};

export default Login;
