import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Sistema de Abastecimento. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;