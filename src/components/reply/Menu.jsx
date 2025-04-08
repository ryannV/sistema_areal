import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import logout from '../../assets/door-closed.svg'

const Menu = () => {
  let navigate = useNavigate();
  const [selected, setSelected] = useState();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/Main") {
      setSelected("Menu Principal");
    } else if (location.pathname === "/Abastecimento") {
      setSelected("Abastecimento");
    } else if (location.pathname === "/Usuario") {
      setSelected("Usuario");
    } else if (location.pathname === "/Maquinario") {
      setSelected("Maquinario");
    } else if (location.pathname === "/Relatorio") {
      setSelected("Relatorio");
    }
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <nav className={styles.navigator}>
        <ul>
          <li onClick={() => handleNavigation('/Main')}
            className={selected === "Menu Principal" ? styles.selected : ""}>
            Menu Principal
          </li>
          <li onClick={() => handleNavigation('/Abastecimento')}
            className={selected === "Abastecimento" ? styles.selected : ""}>
            Abastecimento
          </li>
          <li onClick={() => handleNavigation('/Relatorio')}
            className={selected === "Relatorio" ? styles.selected : ""}>
            Relatórios
          </li>

          <div className={styles.label}>
            <span>Cadastros</span>
          </div>

          <li onClick={() => handleNavigation('/Usuario')}
            className={selected === "Usuario" ? styles.selected : ""}>
            Usuário
          </li>
          <li onClick={() => handleNavigation('/Maquinario')}
            className={selected === "Maquinario" ? styles.selected : ""}>
            Maquinário
          </li>
          <li onClick={() => navigate('/')}>
            <img src={logout} alt="logout" /></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
