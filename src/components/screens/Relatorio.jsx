import React, { useState, useEffect } from "react";
import Menu from "../reply/Menu";
import Titulo from "../reply/Titulo";
import styles from './Relatorio.module.css';

const Relatorio = () => {
    const [tiposMaquinarios, setTiposMaquinarios] = useState([]);
    const [maquinarios, setMaquinarios] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState("");
    const [selectedMaquinario, setSelectedMaquinario] = useState("");
    const [relatorio, setRelatorio] = useState([]);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    useEffect(() => {
        fetch("https://localhost:7027/api/maquinario/tipos")
            .then(res => res.json())
            .then(data => setTiposMaquinarios(data))
            .catch(err => console.error("Erro ao buscar tipos de maquinário:", err));
    }, []);

    useEffect(() => {
        if (selectedTipo) {
            fetch(`https://localhost:7027/api/maquinario?tipo=${selectedTipo}`)
                .then(res => res.json())
                .then(data => setMaquinarios(data))
                .catch(err => console.error("Erro ao buscar maquinários:", err));
        } else {
            setMaquinarios([]);
        }
    }, [selectedTipo]);

    const gerarRelatorio = async () => {
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione a data de início e a data final.");
            return;
        }

        let url = `https://localhost:7027/api/relatorios/gerar?dataInicial=${dataInicio}&dataFinal=${dataFim}`;
        if (selectedTipo) url += `&tipoMaquinario=${selectedTipo}`;
        if (selectedMaquinario) url += `&maquinarioId=${selectedMaquinario}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.length === 0) {
                alert("Nenhum dado encontrado para o intervalo selecionado.");
            } else {
                setRelatorio(data);
                setPaginaAtual(1);
            }
        } catch (err) {
            console.error("Erro ao gerar relatório:", err);
            alert("Ocorreu um erro ao gerar o relatório. Verifique a conexão com a API.");
        }
    };

    // Ordenação
    const [ordem, setOrdem] = useState({ coluna: "", crescente: true });

    const ordenar = (coluna) => {
        const crescente = ordem.coluna === coluna ? !ordem.crescente : true;
        const listaOrdenada = [...relatorio].sort((a, b) => {
            if (a[coluna] < b[coluna]) return crescente ? -1 : 1;
            if (a[coluna] > b[coluna]) return crescente ? 1 : -1;
            return 0;
        });
        setRelatorio(listaOrdenada);
        setOrdem({ coluna, crescente });
    };

    // Paginação
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const dadosPaginados = relatorio.slice(indiceInicial, indiceInicial + itensPorPagina);

    return (
        <div>
            <Titulo />
            <section className={styles.container}>
                <Menu />
                <main className={styles.container_second}>
                    <h4>Consulta de Consumo dos Maquinários</h4>
                    <section className={styles.center}>
                        <div className={styles.boxes}>
                            <label>Tipo de Maquinário</label>
                            <select className={styles.inputs} value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
                                <option value="">Todos</option>
                                {tiposMaquinarios.map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.boxes}>
                            <label>Maquinário</label>
                            <select className={styles.inputs} value={selectedMaquinario} onChange={(e) => setSelectedMaquinario(e.target.value)} disabled={!selectedTipo}>
                                <option value="">Todos desse tipo</option>
                                {maquinarios.map(maquinario => (
                                    <option key={maquinario.id} value={maquinario.id}>{maquinario.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.boxes}>
                            <label>Data Início</label>
                            <input className={styles.inputs} type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                        </div>

                        <div className={styles.boxes}>
                            <label>Data Final</label>
                            <input className={styles.inputs} type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                        </div>
                    </section>

                    <div className={styles.flex}>
                        <button onClick={gerarRelatorio}>Gerar Relatório</button>
                    </div>

                    {relatorio.length > 0 && (
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th onClick={() => ordenar("nomeMaquinario")}>Maquinário</th>
                                    <th onClick={() => ordenar("tipoMaquinario")}>Tipo</th>
                                    <th onClick={() => ordenar("quantidadeLitros")}>Litros</th>
                                    <th onClick={() => ordenar("data")}>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosPaginados.map((r, index) => (
                                    <tr key={index}>
                                        <td>{r.nomeMaquinario}</td>
                                        <td>{r.tipoMaquinario}</td>
                                        <td>{r.quantidadeLitros}</td>
                                        <td>{new Date(r.data).toLocaleDateString("pt-BR")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {relatorio.length > itensPorPagina && (
                        <div className={styles.paginacao}>
                            <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 1}>
                                Anterior
                            </button>
                            <span>Página {paginaAtual}</span>
                            <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={indiceInicial + itensPorPagina >= relatorio.length}>
                                Próxima
                            </button>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default Relatorio;