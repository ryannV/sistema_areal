import styles from './Maquinario.module.css'
import Titulo from '../reply/Titulo';
import Menu from '../reply/Menu';

const Maquinario = () => {
    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />

                <main className={styles.container_second}>
                    Maquinario
                </main>
            </section>
        </div>
    )
}

export default Maquinario;