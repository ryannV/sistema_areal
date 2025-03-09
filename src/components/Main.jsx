import React from "react";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div>
      <section className={styles.top_title}>
        <h1>Ilha do Areal do Rio Doce</h1>
      </section>

      <div className={styles.container}>
        <nav className={styles.navigator}>
          <ul>
            <li>Menu Principal</li>
            <li>Abastecimento</li>
          </ul>
        </nav>
        <main>Imagens dos Maquinarios</main>
      </div>
    </div>
  );
};

export default Main;
