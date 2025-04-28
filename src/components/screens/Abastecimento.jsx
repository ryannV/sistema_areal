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
    fetch("http://56.124.46.139:5000/api/Maquinario/listar") // Ajuste a URL conforme necessário
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
      const response = await fetch("http://56.124.46.139:5000/api/Abastecimento/cadastrar", {
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

              <button type="button" className={styles.botao} onClick={() => { setSelectedMaquinario(""); setQuantidade(""); }}>
                Limpar
              </button>
            </div> {/* boxes */}

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

              <button type="submit" className={styles.botao}>Confirmar</button>
            </div> {/* boxes */}

            {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
          </form>
        </main>
      </section>
    </div>
  );
};

export default Abastecimento;
