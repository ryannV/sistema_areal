import React from 'react'
import styles from './Titulo.module.css'
import logo from '../../assets/logo-areal.png'

const Titulo = () => {
  return (
    <div>
        <section className={styles.top_title}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1>Ilha do Areal do Rio Doce</h1>
        </section>
    </div>
  )
}

export default Titulo