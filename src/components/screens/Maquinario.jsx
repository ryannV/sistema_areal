import styles from './Maquinario.module.css'
import Titulo from '../reply/Titulo';
import Menu from '../reply/Menu';
import Input from '../reply/Input';

const Maquinario = () => {
    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />
                <main className={styles.container_second}>
                    <form>
                        <Input type='text' name="maquinario" placeholder='Digite seu Maquinário' htmlfor='maquinario' label='Maquinário' />
                        <Input type='date' name="data" placeholder='' htmlfor='data' label='Data de Fabricação'/>
                        <div>
                            <label htmlFor="funcao">Tipo do Maquinário</label>
                            <div className={styles.flex}>
                                <label htmlFor="admin">
                                    <input type="radio" name="funcao"/>
                                    Draga
                                </label>
                                <label htmlFor="admin">
                                    <input type="radio" name="funcao"/>
                                    Carregadeira
                                </label>
                                <label htmlFor="admin">
                                    <input type="radio" name="funcao"/>
                                    Caminhão
                                </label>
                            </div>
                        </div>
                        <div className={styles.botao}>
                            <button>Limpar</button>
                            <button>Cadastrar</button>
                        </div>
                        
                    </form>
                </main>
            </section>
        </div>
    )
}

export default Maquinario;