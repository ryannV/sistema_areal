import api from '../api';

export const usuarioService = {
  cadastrar: async (usuarioData) => {
    const { data } = await api.post('/usuario/cadastrar', usuarioData);
    return data;
  }
}; 