import styles from './Usuario.module.css'
import Titulo from '../reply/Titulo';
import Menu from '../reply/Menu';

const Usuario = () => {
    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />

                <main className={styles.container_second}>
                    Usuario
                </main>
            </section>
        </div>
    )
}

export default Usuario;