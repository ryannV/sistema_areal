import React, { useEffect, useState } from "react";
import Menu from "../reply/Menu";
import Titulo from "../reply/Titulo";
import styles from "./Abastecimento.module.css";
import Footer from "../reply/Footer";

const Abastecimento = () => {
  const [maquinarios, setMaquinarios] = useState([]);
  const [selectedMaquinario, setSelectedMaquinario] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  // ✅ Recupera o token do localStorage
  const token = localStorage.getItem("token");

  // 🚜 Carrega os maquinários
  useEffect(() => {
    if (!token) {
      setMensagem("Token não encontrado. Faça login novamente.");
      return;
    }

    fetch("http://4.201.154.196:5000/api/Abastecimento/maquinarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar maquinários.");
        }
        return response.json();
      })
      .then((data) => setMaquinarios(data))
      .catch((error) => {
        console.error(error);
        setMensagem("Erro ao buscar maquinários.");
      });
  }, [token]);

  // 🛢️ Envia o abastecimento
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMaquinario || !quantidade) {
      setMensagem("Por favor, selecione um maquinário e informe a quantidade.");
      return;
    }

    if (!token) {
      setMensagem("Token não encontrado. Faça login novamente.");
      return;
    }

    const dataBrasileira = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

    const abastecimento = {
      maquinarioId: selectedMaquinario,
      quantidadeLitros: parseFloat(quantidade),
      data: dataBrasileira,
    };

    try {
      const response = await fetch(
        "http://4.201.154.196:5000/api/Abastecimento/cadastrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Token aqui
          },
          body: JSON.stringify(abastecimento),
        }
      );

      if (response.ok) {
        setMensagem("✅ Abastecimento registrado com sucesso!");
        setSelectedMaquinario("");
        setQuantidade("");
      } else {
        const errorText = await response.text();
        setMensagem(`❌ Erro: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("❌ Erro ao conectar-se à API.");
    }
  };

  return (
    <div className={styles.wrapper}>
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
          </form>
          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default Abastecimento;
