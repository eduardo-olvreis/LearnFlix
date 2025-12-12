import { useEffect, useState } from "react";
import styles from "./NotasAluno.module.css";

const ItemNota = ({ avaliacao }) => {
  return (
    <li className={styles.itemAvaliacao}>
      <span>{avaliacao.nome}</span>
      <span className={styles.valorNota}></span>
    </li>
  );
};

const CartaoDisciplina = ({ disciplina }) => {
  const estaAprovado = disciplina.media >= 7.0;
  const corNota = estaAprovado ? styles.aprovado : styles.reprovado;

  return (
    <div className={styles.cartaoDisciplina}>
      <header className={styles.cabecalhoDisciplina}>
        <h3>{disciplina.disciplina}</h3>
      </header>
      <div className={styles.resumoNotas}>
        <h4>
          Nota: <span className={corNota}>{disciplina.media.toFixed(1)}</span>
        </h4>
      </div>
      <ul className={styles.listaNotas}>
        {disciplina.avaliacoes.map((avaliacao, index) => (
          <ItemNota key={index} avaliacao={avaliacao} />
        ))}
      </ul>
    </div>
  );
};

export default function NotasAluno() {
  const [dadosProcessados, setDadosProcessados] = useState([]);

  useEffect(() => {
    const stringUsuario = localStorage.getItem("currentUser");
    let emailLogado = "";

    if (stringUsuario) {
        try {
            const objetoUsuario = JSON.parse(stringUsuario);
            emailLogado = objetoUsuario.email;
        } catch (e) {
            console.error("Erro ao ler usuário logado", e);
        }
    }

    if (!emailLogado) return;
    const todasNotas = JSON.parse(localStorage.getItem('bancoNotas') || '[]');
    const minhasNotas = todasNotas.filter(nota => nota.studentEmail === emailLogado);
    const notasPorDisciplina = minhasNotas.reduce((acc, curr) => {
      if (!acc[curr.disciplina]) {
        acc[curr.disciplina] = { professor: curr.professor, notas: [] };
      }
      acc[curr.disciplina].notas.push({ nome: curr.nomeAvaliacao, nota: curr.valor });
      return acc;
    }, {});

    const arrayFinal = Object.keys(notasPorDisciplina).map((nomeDisciplina, index) => {
      const dados = notasPorDisciplina[nomeDisciplina];
      const total = dados.notas.reduce((sum, n) => sum + n.nota, 0);
      const media = dados.notas.length > 0 ? total / dados.notas.length : 0;

      return {
        id: index,
        disciplina: nomeDisciplina,
        professor: dados.professor,
        media: media,
        avaliacoes: dados.notas
      };
    });

    setDadosProcessados(arrayFinal);
  }, []);

  return (
    <div className={styles.containerNotas}>
      <h1 className={styles.tituloPagina}>Minhas Notas</h1>
      <section className={styles.gridNotas}>
        {dadosProcessados.length === 0 ? (
          <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}>
             <p>Nenhuma nota encontrada.</p>
             <small>Certifique-se de que o professor lançou a nota para o seu email correto.</small>
          </div>
        ) : (
          dadosProcessados.map((disciplina) => (
            <CartaoDisciplina key={disciplina.id} disciplina={disciplina} />
          ))
        )}
      </section>
    </div>
  );
};