import React from "react";
import styles from "./NotasAluno.module.css";

const GradeItem = ({ avaliacao }) => {
  return (
    <li className={styles.avaliacaoItem}>
      <span>{avaliacao.nome}</span>
      <span className={styles.gradeValue}>{avaliacao.nota.toFixed(1)}</span>
    </li>
  );
};

const CourseCard = ({ disciplina }) => {
  const gradeColor =
    disciplina.media >= 7.0 ? styles.approved : styles.reproved;

  return (
    <div className={styles.courseCard}>
      <header className={styles.courseHeader}>
        <h3>{disciplina.disciplina}</h3>
        <span className={`${styles.statusBadge} ${gradeColor}`}>
          {disciplina.status}
        </span>
      </header>

      <p className={styles.professorName}>Prof. {disciplina.professor}</p>

      <div className={styles.gradesSummary}>
        <h4>
          Média Final:{" "}
          <span className={gradeColor}>{disciplina.media.toFixed(1)}</span>
        </h4>
      </div>

      <ul className={styles.gradesList}>
        {disciplina.avaliacoes.map((avaliacao, index) => (
          <GradeItem key={index} avaliacao={avaliacao} />
        ))}
      </ul>
    </div>
  );
};

const NotasAluno = ({ dadosNotas }) => {
  const notasParaExibir = dadosNotas || [];

  return (
    <div className={styles.notasContainer}>
      <h1 className={styles.pageTitle}>Minhas Notas</h1>

      <section className={styles.gradesGrid}>
        {notasParaExibir.map((disciplina) => (
          <CourseCard key={disciplina.id} disciplina={disciplina} />
        ))}
      </section>
    </div>
  );
};

export default NotasAluno;
