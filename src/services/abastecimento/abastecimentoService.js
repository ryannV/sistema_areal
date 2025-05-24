import api from '../api';

export const abastecimentoService = {
  cadastrar: async (abastecimentoData) => {
    const { data } = await api.post('/Abastecimento/cadastrar', abastecimentoData);
    return data;
  },
  listarMaquinarios: async () => {
    const { data } = await api.get('/Abastecimento/maquinarios');
    return data;
  }
}; 