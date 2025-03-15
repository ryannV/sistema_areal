import React, { useState, useEffect} from "react";
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
    }
  }, [location.pathname]);

  return (
    <div>
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
            <li onClick={() => navigate('/')}>
            <img src={logout} alt="logout" /></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
