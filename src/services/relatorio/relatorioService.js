import api from '../api';

export const relatorioService = {
  gerar: async (params) => {
    const { data } = await api.get('/relatorios/gerar', { params });
    return data;
  },
  listarDadosAbastecimento: async () => {
    const { data } = await api.get('/relatorios/dadosAbastecimento');
    return data;
  }
}; 