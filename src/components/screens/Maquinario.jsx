import { useState } from 'react';
import { maquinarioService } from '../../services';
import Input from '../reply/Input';
import Menu from '../reply/Menu';
import Titulo from '../reply/Titulo';
import styles from './Maquinario.module.css';

const Maquinario = () => {
    const [maquinario, setMaquinario] = useState('');
    const [dataFabricacao, setDataFabricacao] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoMaquinario = {
            id: 0,
            nome: maquinario,
            dataFabricacao,
            tipo
        };

        try {
            const data = await maquinarioService.cadastrar(novoMaquinario);
                alert(`Maquinário cadastrado com sucesso! ID: ${data.id}`);
                setMaquinario('');
                setDataFabricacao('');
                setTipo('');
        } catch (error) {
            console.error('Erro na requisição:', error);
            if (error.response?.status === 401) {
                alert('⚠️ Não autorizado! Verifique seu login ou token.');
            } else {
                alert(error.response?.data?.message || 'Erro ao conectar com a API.');
            }
        }
    };

    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />
                <main className={styles.container_second}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type='text'
                            name="maquinario"
                            placeholder='Digite seu Maquinário'
                            htmlFor='maquinario'
                            label='Maquinário'
                            value={maquinario}
                            onChange={(e) => setMaquinario(e.target.value)}
                        />
                        <Input
                            type='date'
                            name="data"
                            htmlFor='data'
                            label='Data de Fabricação'
                            value={dataFabricacao}
                            onChange={(e) => setDataFabricacao(e.target.value)}
                        />
                        <div>
                            <label htmlFor="tipo">Tipo do Maquinário</label>
                            <div className={styles.flex}>
                                {['Draga', 'Carregadeira', 'Caminhão'].map((tipoMaquinario) => (
                                    <label key={tipoMaquinario}>
                                        <input
                                            type="radio"
                                            name="tipo"
                                            value={tipoMaquinario}
                                            checked={tipo === tipoMaquinario}
                                            onChange={(e) => setTipo(e.target.value)}
                                        />
                                        {tipoMaquinario}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className={styles.botao}>
                            <button
                                type="reset"
                                onClick={() => {
                                    setMaquinario('');
                                    setDataFabricacao('');
                                    setTipo('');
                                }}
                            >
                                Limpar
                            </button>
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </main>
            </section>
        </div>
    );
};

export default Maquinario;
