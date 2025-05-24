import React, { useEffect, useState } from "react";
import DataTable from "../reply/DataTable";
// @ts-ignore
import Menu from "../reply/Menu.jsx";
// @ts-ignore
import { relatorioService } from '../../services';
import Titulo from "../reply/Titulo.jsx";
import styles from "./Relatorio.module.css";

interface AbastecimentoDTO {
  nomeMaquinario: string;
  tipoMaquinario: string;
  quantidadeLitros: number;
  data: string;
}

interface Column<T> {
  label: string;
  key: keyof T;
}

const AbastecimentosPage: React.FC = () => {
  const [data, setData] = useState<AbastecimentoDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: Column<AbastecimentoDTO>[] = [
    {
      label: "Nome do Maquinário",
      key: "nomeMaquinario" as keyof AbastecimentoDTO,
    },
    { label: "Tipo", key: "tipoMaquinario" as keyof AbastecimentoDTO },
    {
      label: "Quantidade (Litros)",
      key: "quantidadeLitros" as keyof AbastecimentoDTO,
    },
    { label: "Data", key: "data" as keyof AbastecimentoDTO },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await relatorioService.listarDadosAbastecimento();
        setData(data);
      } catch (error) {
        console.error("Erro ao buscar dados de abastecimento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <h1 className="text-2xl font-bold text-center mt-4">
          Relatório de Abastecimentos
        </h1>
        {loading ? (
          <div className="text-center mt-10 text-gray-600">
            Carregando dados...
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </section>
    </div>
  );
};

export default AbastecimentosPage;