import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import logout from '../../assets/door-closed.svg';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth(); // uso seguro
  const funcao = auth?.usuario?.funcao || ""; // evita erro de undefined
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
      "/Fornecedor": "Fornecedor"
    };
    setSelected(pathToLabel[location.pathname]);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <nav className={styles.navigator}>
        <ul>
          <li
            onClick={() => handleNavigation('/Main')}
            className={selected === "Menu Principal" ? styles.selected : ""}
          >
            Menu Principal
          </li>

          <li
            onClick={() => handleNavigation('/Abastecimento')}
            className={selected === "Abastecimento" ? styles.selected : ""}
          >
            Abastecimento
          </li>

          <li
            onClick={() => handleNavigation('/Relatorio')}
            className={selected === "Relatorio" ? styles.selected : ""}
          >
            Relatórios
          </li>

          <li
            onClick={() => handleNavigation('/Relatorio-Novo')}
            className={selected === "Relatorio Novo" ? styles.selected : ""}
          >
            Relatório Novo
          </li>

          {/* Menu de Cadastros apenas para administradores */}
          {funcao === 'administrador' && (
            <>
              <div className={styles.label}>
                <span>Cadastros</span>
              </div>

              <li
                onClick={() => handleNavigation('/Usuario')}
                className={selected === "Usuario" ? styles.selected : ""}
              >
                Usuário
              </li>

              <li
                onClick={() => handleNavigation('/Maquinario')}
                className={selected === "Maquinario" ? styles.selected : ""}
              >
                Maquinário
              </li>

              <li
                onClick={() => handleNavigation('/Fornecedor')}
                className={selected === "Fornecedor" ? styles.selected : ""}
              >
                Fornecedor
              </li>
            </>
          )}

          <li onClick={() => navigate('/')}>
            <img src={logout} alt="logout" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;