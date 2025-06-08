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

    fetch("api/Abastecimento/maquinarios", {
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

    function dataAbastecimento() {
      const date = new Date();

      // Pega partes da data local (ano, mês, dia, hora, min, seg)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      const second = String(date.getSeconds()).padStart(2, "0");

      // Calcula offset no formato ±HH:mm
      const tzOffsetMin = date.getTimezoneOffset();
      const sinal = tzOffsetMin > 0 ? "-" : "+";
      const offsetHour = String(
        Math.floor(Math.abs(tzOffsetMin) / 60)
      ).padStart(2, "0");
      const offsetMinute = String(Math.abs(tzOffsetMin) % 60).padStart(2, "0");

      const offset = `${sinal}${offsetHour}:${offsetMinute}`;

      // Monta a string no formato ISO local com offset
      return `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`;
    }

    const abastecimento = {
      maquinarioId: selectedMaquinario,
      quantidadeLitros: parseFloat(quantidade),
      data: dataAbastecimento(),
    };
    console.log("Abastecimentos: ", abastecimento);

    try {
      const response = await fetch("api/Abastecimento/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Token aqui
        },
        body: JSON.stringify(abastecimento),
      });

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
            </div>

            <div className={styles.botoesContainer}>
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
