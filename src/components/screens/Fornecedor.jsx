import React, { useState } from 'react';
import axios from 'axios';
import Input from '../reply/Input';
import Menu from '../reply/Menu';
import Titulo from '../reply/Titulo';
import styles from './Fornecedor.module.css';
import { jwtDecode } from 'jwt-decode';
import Footer from '../reply/Footer';

const Fornecedor = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // Verificação opcional do tipo de usuário
      if (role !== 'administrador') {
      alert('Apenas administradores podem cadastrar fornecedores.');
      return;
      }

      const response = await axios.post(
        'api/Fornecedor/cadastrar',
        fornecedor,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        alert('Fornecedor cadastrado com sucesso!');
        handleClear();
      }
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      alert('Erro ao cadastrar fornecedor. Tente novamente.');
    }
  };

  return (
    <div  className={styles.wrapper}>
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

          <div className={styles.botao}>
            <button type="button" onClick={handleClear}>Limpar</button>
            <button type="submit" onClick={handleSubmit}>Cadastrar</button>
          </div>
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default Fornecedor;
