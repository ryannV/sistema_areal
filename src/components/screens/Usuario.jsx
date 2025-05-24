import { useState } from 'react';
import { usuarioService } from '../../services';
import Input from '../reply/Input';
import Menu from '../reply/Menu';
import Titulo from '../reply/Titulo';
import styles from './Usuario.module.css';

const Usuario = () => {
    const [formData, setFormData] = useState({
        usuario: '', senha: '', confirmarSenha: '', email: '', cpf: '',
        rua: '', bairro: '', cep: '', cidade: '', estado: '', numero: '', funcao: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`📝 Campo alterado: ${name}, Novo valor: ${value}`);
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🚀 handleSubmit foi chamado!');
        console.log('🔍 Dados do formulário antes do envio:', formData);

        if (formData.senha !== formData.confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        const requiredFields = ['usuario', 'senha', 'confirmarSenha', 'email', 'cpf'];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setError(`O campo ${field} é obrigatório.`);
                return;
            }
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError('O formato do email é inválido.');
            return;
        }

        const requestPayload = {
            ...formData,
            endereco: `${formData.rua}, ${formData.bairro}, ${formData.numero}, ${formData.cidade} - ${formData.estado}, CEP: ${formData.cep}`,
        };

        console.log('📤 Enviando para o backend:', requestPayload);
        setLoading(true);
        setError('');

        try {
            await usuarioService.cadastrar(requestPayload);
            console.log('✅ Usuário cadastrado com sucesso!');
            alert('Usuário cadastrado com sucesso!');
            setFormData({
                usuario: '', senha: '', confirmarSenha: '', email: '', cpf: '',
                rua: '', bairro: '', cep: '', cidade: '', estado: '', numero: '', funcao: '',
            });
        } catch (error) {
            console.error('⚠️ Erro na requisição:', error);
            setError(error.response?.data?.message || 'Erro ao cadastrar usuário');
        } finally {
            setLoading(false);
        }
    };

    const typeCondition = (field) => {
        if (field === 'senha' || field === 'confirmarSenha') {
            return 'password';
        } else if (field === 'cpf' || field === 'numero') {
            return 'number';
        } else if (field === 'email') {
            return 'email';
        } else {
            return 'text';
        }
    };

    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />
                <main className={styles.container_second}>
                    <form onSubmit={handleSubmit}>
                        {['usuario', 'senha', 'confirmarSenha', 'email', 'cpf'].map((field) => (
                            <Input key={field} 
                                type={typeCondition(field)}
                                name={field} 
                                placeholder={field.includes('confirmarSenha') ? 'Digite sua senha novamente' : `Digite seu ${field}`} 
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]} 
                                onChange={handleChange} 
                                required 
                            />
                        ))}

                        <label style={{ color: "#1a4f77" }}>Endereço</label>
                        <div className={styles.flex}>
                            {['rua', 'bairro'].map((field) => (
                                <Input key={field} 
                                    type={typeCondition(field)} 
                                    name={field} 
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]} 
                                    onChange={handleChange} 
                                    required 
                                />
                            ))}
                        </div>
                        <div className={styles.flex}>
                            {['cep', 'cidade', 'estado', 'numero'].map((field) => (
                                <Input key={field} 
                                    type={field === 'numero' ? 'number' : 'text'}
                                    name={field} 
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]} 
                                    onChange={handleChange} 
                                    required 
                                />
                            ))}
                        </div>

                        <label>Função</label>
                        <div className={styles.flex}>
                            {['administrador', 'operador'].map((func) => (
                                <label key={func}>
                                    <input 
                                        type="radio" 
                                        name="funcao" 
                                        value={func} 
                                        checked={formData.funcao === func} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                    {func.charAt(0).toUpperCase() + func.slice(1)}
                                </label>
                            ))}
                        </div>

                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                        <div className={styles.botao}>
                            <button type="reset">Limpar</button>
                            <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                        </div>
                    </form>
                </main>
            </section>
        </div>
    );
};

export default Usuario;