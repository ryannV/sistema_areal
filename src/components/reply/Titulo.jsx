import styles from './Titulo.module.css'
import logo from '../../assets/logo-areal-sf.png'

const Titulo = () => {
  return (
   <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.title}>Areal Ilha do Rio Doce</h1>
    </header>
  )
}

export default Titulo