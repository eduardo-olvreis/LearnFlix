import React from "react";
import styles from "./DashboardAluno.module.css";

const DashboardCard = ({ title, value, unit = "" }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>
      {value}
      {unit}
    </p>
  </div>
);

const DashboardAluno = ({ mediaGeral, totalCursos, tarefasPendentes }) => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.welcomeHeader}>
        <h1>Bem-vindo(a)!</h1>
      </header>

      <section className={styles.statsGrid}>
        <DashboardCard title="Média Geral" value={mediaGeral} />
        <DashboardCard title="Total de Cursos" value={totalCursos} />
        <DashboardCard
          title="Tarefas Pendentes"
          value={tarefasPendentes}
          unit="x"
        />
      </section>

      <section className={styles.pendingSection}>
        <h2>Notificações</h2>
        <div className={styles.pendingList}>
          <p>Você tem 1 prova de Programação Web III na próxima semana.</p>
          <p>Novo material disponível em Banco de Dados.</p>
        </div>
      </section>
    </div>
  );
};

export default DashboardAluno;
