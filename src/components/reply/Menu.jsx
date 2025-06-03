import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logout from "../../assets/door-closed.svg";
import { Menu as MenuIcon } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const funcao = auth?.usuario?.funcao || "";
  const [recolhido, setRecolhido] = useState(() => {
    const stored = localStorage.getItem("menuRecolhido");
    return stored === "true";
  });
  const [selected, setSelected] = useState();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const pathToLabel = {
      "/Main": "Menu Principal",
      "/Abastecimento": "Abastecimento",
      "/Usuario": "Usuario",
      "/Maquinario": "Maquinario",
      "/Relatorio": "Relatorio",
      "/Relatorio-Novo": "Relatorio Novo",
      "/Fornecedor": "Fornecedor",
    };
    setSelected(pathToLabel[location.pathname]);
  }, [location.pathname]);

  const toggleMenu = () => {
    setRecolhido(prev => {
      const novoEstado = !prev;
      localStorage.setItem("menuRecolhido", novoEstado);
      return novoEstado;
    });
  };

  return (
    <aside className={`${styles.container} ${recolhido ? styles.recolhido : ""}`}>
      <div className={styles.toggle} onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <nav className={styles.navigator}>
        <ul>
          <li
            onClick={() => handleNavigation("/Main")}
            className={selected === "Menu Principal" ? styles.selected : ""}
          >
            🏠 <span>Menu Principal</span>
          </li>
          <li
            onClick={() => handleNavigation("/Abastecimento")}
            className={selected === "Abastecimento" ? styles.selected : ""}
          >
            ⛽ <span>Abastecimento</span>
          </li>

          {funcao === "administrador" && (
            <>
              <div  className={`${styles.label} ${recolhido ? styles.labelHidden : ""}`}>
                <span>Relatórios</span>
              </div>
              <li
                onClick={() => handleNavigation("/Relatorio")}
                className={selected === "Relatorio" ? styles.selected : ""}
              >
                📄 <span>Relatórios</span>
              </li>

              <div  className={`${styles.label} ${recolhido ? styles.labelHidden : ""}`}>
                <span>Cadastros</span>
              </div>
              <li
                onClick={() => handleNavigation("/Usuario")}
                className={selected === "Usuario" ? styles.selected : ""}
              >
                👤 <span>Usuário</span>
              </li>
              <li
                onClick={() => handleNavigation("/Maquinario")}
                className={selected === "Maquinario" ? styles.selected : ""}
              >
                🚜 <span>Maquinário</span>
              </li>
              <li
                onClick={() => handleNavigation("/Fornecedor")}
                className={selected === "Fornecedor" ? styles.selected : ""}
              >
                📦 <span>Fornecedor</span>
              </li>
            </>
          )}

          {/* <li onClick={() => { auth.logout(); navigate("/"); }}>
            <img src={logout} alt="logout" className={styles.logout} />
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;