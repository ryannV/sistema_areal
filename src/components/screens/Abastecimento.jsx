import { useEffect, useState } from "react";
import { abastecimentoService } from '../../services';
import Menu from "../reply/Menu";
import Titulo from "../reply/Titulo";
import styles from "./Abastecimento.module.css";

const Abastecimento = () => {
  const [maquinarios, setMaquinarios] = useState([]);
  const [selectedMaquinario, setSelectedMaquinario] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  // 🚜 Carrega os maquinários
  useEffect(() => {
    const carregarMaquinarios = async () => {
      try {
        const data = await abastecimentoService.listarMaquinarios();
        setMaquinarios(data);
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao buscar maquinários.");
      }
    };

    carregarMaquinarios();
  }, []);

  // 🛢️ Envia o abastecimento
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMaquinario || !quantidade) {
      setMensagem("Por favor, selecione um maquinário e informe a quantidade.");
      return;
    }

    const abastecimento = {
      maquinarioId: selectedMaquinario,
      quantidadeLitros: parseFloat(quantidade),
      data: new Date().toISOString(),
    };

    try {
      await abastecimentoService.cadastrar(abastecimento);
        setMensagem("✅ Abastecimento registrado com sucesso!");
        setSelectedMaquinario("");
        setQuantidade("");
    } catch (error) {
      console.error("Erro:", error);
      setMensagem(error.response?.data?.message || "❌ Erro ao conectar-se à API.");
    }
  };

  return (
    <div>
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <main className={styles.container_second}>
          <form className={styles.center} onSubmit={handleSubmit}>
            <div className={styles.boxes}>
              <label htmlFor="comboBox">Maquinário</label>
              <select
                className={styles.inputs}
                id="comboBox"
                value={selectedMaquinario}
                onChange={(e) => setSelectedMaquinario(e.target.value)}
              >
                <option value="">Selecione</option>
                {maquinarios.map((maquinario) => (
                  <option key={maquinario.id} value={maquinario.id}>
                    {maquinario.nome}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className={styles.botao}
                onClick={() => {
                  setSelectedMaquinario("");
                  setQuantidade("");
                }}
              >
                Limpar
              </button>
            </div>

            <div className={styles.boxes}>
              <label htmlFor="quantidade">Quantidade (L)</label>
              <input
                className={styles.inputs}
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                step="0.1"
              />
              <button type="submit" className={styles.botao}>
                Confirmar
              </button>
            </div>

            {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
          </form>
        </main>
      </section>
    </div>
  );
};

export default Abastecimento;
