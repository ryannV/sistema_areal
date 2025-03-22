import React, { useEffect, useState } from "react";
import Menu from "../reply/Menu";
import Titulo from "../reply/Titulo";
import styles from "./Abastecimento.module.css";

const Abastecimento = () => {
  const [maquinarios, setMaquinarios] = useState([]); // Lista de maquinários
  const [selectedMaquinario, setSelectedMaquinario] = useState(""); // ID do maquinário selecionado
  const [quantidade, setQuantidade] = useState(""); // Quantidade abastecida
  const [mensagem, setMensagem] = useState(""); // Mensagem de feedback

  // 🚀 Carrega os maquinários ao carregar a página
  useEffect(() => {
    fetch("https://localhost:7027/api/Maquinario/listar") // Ajuste a URL conforme necessário
      .then((response) => response.json())
      .then((data) => setMaquinarios(data))
      .catch((error) => console.error("Erro ao buscar maquinários:", error));
  }, []);

  // 🎯 Envia o abastecimento para a API
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedMaquinario || !quantidade) {
      alert("Por favor, selecione um maquinário e informe a quantidade.");
      return;
    }
  
    const abastecimento = {
      maquinarioId: selectedMaquinario,
      quantidadeLitros: parseFloat(quantidade),
      data: new Date().toISOString()
    };
  
    try {
      const response = await fetch("https://localhost:7027/api/Abastecimento/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(abastecimento),
      });
  
      if (response.ok) {
        alert("Abastecimento registrado com sucesso!");
        setSelectedMaquinario("");
        setQuantidade("");
      } else {
        alert("Erro ao registrar abastecimento.");
      }
    } catch (error) {
      alert("Erro ao conectar-se à API.");
      console.error("Erro:", error);
    }
  };
  
  return (
    <div>
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <main className={styles.container_second}>
          <form onSubmit={handleSubmit}>
            <div className={styles.boxes}>
              <label htmlFor="comboBox">Maquinário</label>
              <select
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
            </div>

            <div className={styles.boxes}>
              <label htmlFor="quantidade">Quantidade (L)</label>
              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                step="0.1"
              />
            </div>

            {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

            <div className={styles.boxes}>
              <button type="button" className={styles.botao} onClick={() => { setSelectedMaquinario(""); setQuantidade(""); }}>
                Limpar
              </button>
              <button type="submit" className={styles.botao}>
                Confirmar
              </button>
            </div>
          </form>
        </main>
      </section>
    </div>
  );
};

export default Abastecimento;
