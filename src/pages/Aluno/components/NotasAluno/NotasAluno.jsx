import React from "react";
import styles from "./NotasAluno.module.css";

export default function NotasAluno() {
  return (
    <div className={styles.historicoContainer}>
      <h1>Histórico de Notas 📊</h1>
      <p>
        Esta é a **tela de Histórico de Notas** (componente provisório). Aqui
        você poderá consultar todas as suas notas por semestre/disciplina.
      </p>
      <ul className={styles.notasLista}>
        <li className={styles.notasItem}>
          <span>Disciplina: Desenvolvimento Front-End</span>
          <span className={`${styles.notaDestaque} ${styles.statusAprovado}`}>
            Nota: 8.5
          </span>
        </li>
        <li className={styles.notasItem}>
          <span>Disciplina: Desenvolvimento Back-End</span>
          <span className={`${styles.notaDestaque} ${styles.statusReprovado}`}>
            Nota: 6.0
          </span>
        </li>
      </ul>
    </div>
  );
}
