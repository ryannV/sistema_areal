import React from "react";
import styles from "./Menu.module.css";
import { useNavigate } from "react-router-dom";
import logout from '../../assets/door-closed.svg'

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.navigator}>
          <ul>
            <li onClick={() => navigate('/Main')}>Menu Principal</li>
            <li onClick={() => navigate('/Abastecimento')}>Abastecimento</li>
            <li onClick={() => navigate('/')}><img src={logout} alt="logout" /></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
