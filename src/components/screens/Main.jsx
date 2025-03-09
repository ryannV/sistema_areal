import React from "react";
import Titulo from "../reply/Titulo";
import Menu from "../reply/Menu";
import styles from './Main.module.css';

const Main = () => {
  return (
    <div>
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <p>Main</p>
      </section>
    </div>
  );
};

export default Main;
