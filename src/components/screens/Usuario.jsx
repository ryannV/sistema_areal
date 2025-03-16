import styles from './Usuario.module.css'
import Titulo from '../reply/Titulo';
import Menu from '../reply/Menu';
import Input from '../reply/Input';

const Usuario = () => {
    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />

                <main className={styles.container_second}>
                    <form>
                        <Input type='text' name='usuario' placeholder='Digite seu Usuario' htmlfor='usuario' label='Usuário'/>
                        <Input type='password' name='password' placeholder='Digite sua Senha' htmlfor='password' label='Senha'/>
                        <Input type='password' name='p-confirm' placeholder='Digite Novamente' htmlfor='p-confirm' label='Confirme sua Senha'/>
                        <Input type='email' name='email' placeholder='Digite seu Email' htmlfor='email' label='E-mail'/>
                        <Input type='number' name='number' placeholder='Digite seu CPF' htmlfor='cpf' label='CPF'/>

                        {/* Endereço */}
                        <label style={{color: "#1a4f77"}} htmlFor="endereco">Endereço</label>
                        <div className={styles.flex}>
                            <Input type='text' name='rua' placeholder='Rua' htmlfor='' label=''/>
                            <Input type='text' name='bairro' placeholder='Bairro' htmlfor='' label=''/>
                        </div>
                        <div className={styles.flex}>
                            <Input type='number' name='cep' placeholder='CEP' htmlfor='' label=''/>
                            <Input type='text' name='cidade' placeholder='Cidade' htmlfor='' label=''/>
                            <Input type='text' name='Estado' placeholder='Estado' htmlfor='' label=''/>
                            <Input type='number' name='numero' placeholder='Número' htmlfor='' label=''/>
                        </div>

                        {/* Radio */}
                        <div>
                            <label htmlFor="funcao">Função</label>
                            <div className={styles.flex}>
                                <label htmlFor="admin">
                                    <input type="radio" name="funcao" value="admin" />
                                    Administrador
                                </label>

                                <label htmlFor="operador">
                                    <input type="radio" name="funcao" value="operador"/>
                                    Operador
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
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

export default Usuario;