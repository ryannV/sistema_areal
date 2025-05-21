import React, { useState } from 'react';
import axios from 'axios'; // Importando o Axios
import Input from '../reply/Input';
import Menu from '../reply/Menu';
import Titulo from '../reply/Titulo';
import styles from './Fornecedor.module.css';

const Fornecedor = () => {
    // Estado para armazenar os dados do formulário
    const [fornecedor, setFornecedor] = useState({
        razao: '',
        cnpj: '',
        ie: '',
        email: '',
        rua: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        numero: ''
    });

    // Função para atualizar o estado conforme os campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFornecedor({
            ...fornecedor,
            [name]: value
        });
    };

    // Função para limpar os campos do formulário
    const handleClear = () => {
        setFornecedor({
            razao: '',
            cnpj: '',
            ie: '',
            email: '',
            rua: '',
            bairro: '',
            cep: '',
            cidade: '',
            estado: '',
            numero: ''
        });
    };

    // Função para enviar os dados para a API
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar o comportamento padrão do form (recarregar a página)
        
        try {
            // Enviar os dados para a API usando Axios
            const response = await axios.post('http://localhost:5209/api/Fornecedor/cadastrar', fornecedor);
            
            if (response.status === 200) {
                alert('Fornecedor cadastrado com sucesso!');
                handleClear(); // Limpar o formulário após o sucesso
            }
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            alert('Erro ao cadastrar fornecedor. Tente novamente.');
        }
    };

    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />

                <main className={styles.container_second}>
                    <Input
                        type="text"
                        name="razao"
                        placeholder="Digite sua razão social"
                        htmlFor="razao"
                        label="Razão Social"
                        value={fornecedor.razao}
                        onChange={handleChange}
                    />
                    <Input
                        type="number"
                        name="cnpj"
                        placeholder="Digite seu CNPJ"
                        htmlFor="cnpj"
                        label="CNPJ"
                        value={fornecedor.cnpj}
                        onChange={handleChange}
                    />
                    <Input
                        type="number"
                        name="ie"
                        placeholder="Digite sua Inscrição Estadual"
                        htmlFor="ie"
                        label="Inscrição Estadual"
                        value={fornecedor.ie}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu Email"
                        htmlFor="email"
                        label="Email"
                        value={fornecedor.email}
                        onChange={handleChange}
                    />

                    {/* Endereço */}
                    <label style={{ color: "#1a4f77" }} htmlFor="endereco">Endereço</label>
                    <div className={styles.flex}>
                        <Input
                            type='text'
                            name='rua'
                            placeholder='Rua'
                            value={fornecedor.rua}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='bairro'
                            placeholder='Bairro'
                            value={fornecedor.bairro}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.flex}>
                        <Input
                            type='number'
                            name='cep'
                            placeholder='CEP'
                            value={fornecedor.cep}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='cidade'
                            placeholder='Cidade'
                            value={fornecedor.cidade}
                            onChange={handleChange}
                        />
                        <Input
                            type='text'
                            name='estado'
                            placeholder='Estado'
                            value={fornecedor.estado}
                            onChange={handleChange}
                        />
                        <Input
                            type='number'
                            name='numero'
                            placeholder='Número'
                            value={fornecedor.numero}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Buttons */}
                    <div className={styles.botao}>
                        <button type="button" onClick={handleClear}>Limpar</button>
                        <button type="submit" onClick={handleSubmit}>Cadastrar</button>
                    </div>
                </main>

            </section>
        </div>
    );
};

export default Fornecedor;
