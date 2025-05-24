import api from '../api';

export const maquinarioService = {
  /**
   * Lista todos os tipos de maquinário disponíveis
   * @returns {Promise<Array>} Lista de tipos de maquinário
   */
  listarTipos: async () => {
    const { data } = await api.get('/maquinario/tipos');
    return data;
  },

  /**
   * Lista maquinários por tipo
   * @param {string} tipo - Tipo do maquinário
   * @returns {Promise<Array>} Lista de maquinários do tipo especificado
   */
  listarPorTipo: async (tipo) => {
    const { data } = await api.get(`/maquinario/tipo/${tipo}`);
    return data;
  },

  /**
   * Cadastra um novo maquinário
   * @param {Object} maquinario - Dados do maquinário a ser cadastrado
   * @returns {Promise<Object>} Dados do maquinário cadastrado
   */
  cadastrar: async (maquinarioData) => {
    const { data } = await api.post('/maquinario/cadastrar', maquinarioData);
    return data;
  }
}; 