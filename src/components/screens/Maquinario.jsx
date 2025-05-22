import { useState } from 'react';
import styles from './Maquinario.module.css';
import Titulo from '../reply/Titulo';
import Menu from '../reply/Menu';
import Input from '../reply/Input';

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

        const token = localStorage.getItem('token');
  
        if (!token) {
            alert('Usuário não autenticado. Faça login novamente.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5209/api/Maquinario/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(novoMaquinario),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Maquinário cadastrado com sucesso! ID: ${data.id}`);
                setMaquinario('');
                setDataFabricacao('');
                setTipo('');
            } else if (response.status === 401) {
                alert('⚠️ Não autorizado! Verifique seu login ou token.');
            } else {
                const errorText = await response.text();
                console.error('Erro ao cadastrar:', errorText);
                alert('Erro ao cadastrar maquinário!');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar com a API.');
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
