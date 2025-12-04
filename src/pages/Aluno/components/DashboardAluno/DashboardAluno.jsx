import React from "react";
import styles from "./DashboardAluno.module.css";

export default function DashboardAluno() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>📊 Bem-vindo ao Dashboard do Aluno!</h2>
        <p>
          Este é o conteúdo principal que aparece ao acessar a rota base /aluno.
        </p>
        <p>
          Aqui você poderá ver suas notas recentes, próximos prazos e um resumo
          do seu progresso.
        </p>
      </div>
    </div>
  );
}
