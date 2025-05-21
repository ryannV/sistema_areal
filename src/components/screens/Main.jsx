import React from "react";
import Titulo from "../reply/Titulo";
import Menu from "../reply/Menu";
import styles from './Main.module.css';
import { useAuth } from "../../context/AuthContext"; // <- Importa o contexto

const Main = () => {
  const { usuario } = useAuth();

  console.log("👤 Usuário logado:", usuario); // Depuração

  return (
    <div>
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <div className={styles.content}>
          <h2>Bem-vindo(a){usuario?.nome ? `, ${usuario.nome}` : ""}!</h2>
          <p>Função: {usuario?.funcao || "Desconhecida"}</p>
        </div>
      </section>
    </div>
  );
};

export default Main;
