import Titulo from "../reply/Titulo";
import Menu from "../reply/Menu";
import styles from './Main.module.css';
import { useAuth } from "../../context/AuthContext";
import Footer from "../reply/Footer";

// Ícones
import { Fuel, CalendarCheck, Wrench, Tractor, Truck, Construction  } from "lucide-react";

// Gráfico
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Animação
import { motion } from "framer-motion";

const Main = () => {
  const { usuario } = useAuth();

  // Simulação de dados
  const resumoHoje = {
    abastecimentos: 14,
    litros: 680,
    equipamentos: 6,
  };

  const avisos = [
    "Evite abastecer fora do horário permitido.",
    "Todos os operadores devem registrar abastecimentos até 18h.",
    "Manutenção agendada no trator 02 amanhã às 10h.",
  ];

  const consumoSemana = [
    { tipo: "Trator", litros: 320, icon: <Tractor size={24} /> },
    { tipo: "Escavadeira", litros: 180, icon: <Construction size={24} /> },
    { tipo: "Caminhão", litros: 210, icon: <Truck size={24} /> },
  ];

  return (
    <div className={styles.wrapper}>
      <Titulo />
      <section className={styles.container}>
        <Menu />
        <main className={styles.container_second}>
          <motion.section
            className={styles.apresentation}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Bem-vindo(a){usuario?.nome ? `, ${usuario.nome}` : ""}!</h2>
            <p>Função: {usuario?.funcao || "Desconhecida"}</p>
          </motion.section>

          <section>
            <h3 className={styles.sectionTitle}>Resumo de Hoje</h3>
            <div className={styles.cardGroup}>
              <motion.div
                className={styles.card}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Fuel size={20} color="#1a4f77" />
                <h3>Abastecimentos</h3>
                <p>{resumoHoje.abastecimentos}</p>
              </motion.div>

              <motion.div
                className={styles.card}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CalendarCheck size={20} color="#1a4f77" />
                <h3>Litros Consumidos</h3>
                <p>{resumoHoje.litros} L</p>
              </motion.div>

              <motion.div
                className={styles.card}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Wrench size={20} color="#1a4f77" />
                <h3>Equipamentos</h3>
                <p>{resumoHoje.equipamentos}</p>
              </motion.div>
            </div>
          </section>

          <section>
            <h3 className={styles.sectionTitle}>Avisos Gerais</h3>
            <motion.div
              className={styles.avisos}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ul>
                {avisos.map((aviso, idx) => (
                  <li key={idx}>{aviso}</li>
                ))}
              </ul>
            </motion.div>
          </section>

          <section>
            <h3 className={styles.sectionTitle}>Consumo da Semana por Tipo de Equipamento</h3>
            <motion.div
              className={styles.cardGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {consumoSemana.map((item, idx) => (
                <div className={styles.card} key={idx}>
                  {item.icon}
                  <h3>{item.tipo}</h3>
                  <p>{item.litros} L</p>
                </div>
              ))}
            </motion.div>

            <div style={{ marginTop: "2rem", height: "300px", background: "white", padding: "1rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumoSemana}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="litros" fill="#1a4f77" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default Main;
