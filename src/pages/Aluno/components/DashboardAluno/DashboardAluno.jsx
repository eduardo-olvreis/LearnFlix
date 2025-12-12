import { useEffect, useState } from "react";
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

export default function DashboardAluno() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [mediaCalculada, setMediaCalculada] = useState("-"); 
  const [alunoEmail, setAlunoEmail] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    let emailLogado = "";

    if (userString) {
      try {
        const userObj = JSON.parse(userString);
        emailLogado = userObj.email;
        setAlunoEmail(emailLogado);
      } catch (e) {
        console.error("Erro ao ler usuário", e);
      }
    }

    const dadosSalvos = localStorage.getItem('avaliacoes');
    const entregasSalvas = localStorage.getItem('entregasDetalhadas'); 

    if (dadosSalvos) setAvaliacoes(JSON.parse(dadosSalvos));
    if (entregasSalvas) setEntregas(JSON.parse(entregasSalvas));

    if (emailLogado) {
      const bancoNotas = JSON.parse(localStorage.getItem('bancoNotas') || '[]');
      
      const minhasNotas = bancoNotas.filter(n => n.studentEmail === emailLogado);

      if (minhasNotas.length > 0) {
        const total = minhasNotas.reduce((acc, curr) => acc + Number(curr.valor), 0);
        const media = total / minhasNotas.length;
        setMediaCalculada(media.toFixed(1));
      } else {
        setMediaCalculada("0.0");
      }
    }

  }, []);

  const toggleConclusao = (atividadeId) => {
    if (!alunoEmail) return;

    const todasEntregas = JSON.parse(localStorage.getItem('entregasDetalhadas') || '[]');
    const jaEntregou = todasEntregas.find(e => e.alunoEmail === alunoEmail && e.atividadeId === atividadeId);

    let novaLista;
    if (jaEntregou) {
      novaLista = todasEntregas.filter(e => !(e.alunoEmail === alunoEmail && e.atividadeId === atividadeId));
    } else {
      novaLista = [...todasEntregas, { alunoEmail: alunoEmail, atividadeId: atividadeId }];
    }

    localStorage.setItem('entregasDetalhadas', JSON.stringify(novaLista));
    setEntregas(novaLista);
  };

  const meusIdsConcluidos = entregas
    .filter(e => e.alunoEmail === alunoEmail)
    .map(e => e.atividadeId);

  const pendentes = avaliacoes.filter(a => !meusIdsConcluidos.includes(a.id));
  const provasPendentes = pendentes.filter(a => a.tipo === 'prova');
  const trabalhosPendentes = pendentes.filter(a => a.tipo === 'trabalho');

  const notificacoesUrgentes = pendentes.filter(a => {
    const dataProva = new Date(a.data);
    const hoje = new Date();
    dataProva.setHours(0,0,0,0);
    hoje.setHours(0,0,0,0);
    
    const diffTime = dataProva - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays >= 0 && diffDays <= 3;
  });

  const formatarData = (dataIso) => {
    if (!dataIso) return "";
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.welcomeHeader}>
        <h1>Bem-vindo(a)!</h1>
      </header>

      <section className={styles.statsGrid}>
        <DashboardCard title="Média Geral" value={mediaCalculada} />
        <DashboardCard
          title="Tarefas Pendentes"
          value={pendentes.length}
          unit=""
        />
        <DashboardCard 
          title="Tarefas Concluídas" 
          value={meusIdsConcluidos.length} 
        />
      </section>

      {notificacoesUrgentes.length > 0 && (
        <section className={`${styles.pendingSection} ${styles.urgentSection}`}>
          <h2 className={styles.urgentTitle}>Atenção: Prazos Próximos!</h2>
          <div className={styles.pendingList}>
             {notificacoesUrgentes.map(av => (
               <p key={av.id}>
                 A atividade de <strong>{av.materia}</strong> ({av.tipo}) vence dia {formatarData(av.data)}.
               </p>
             ))}
          </div>
        </section>
      )}

      <div className={styles.splitGrid}>
        
        {/* Coluna Provas */}
        <section className={styles.pendingSection}>
          <h2>Provas Agendadas</h2>
          <div className={styles.pendingList}>
            {provasPendentes.length === 0 ? (
                <p>Nenhuma prova pendente.</p>
            ) : (
                provasPendentes.map((prova) => (
                  <div key={prova.id} className={styles.taskItem}>
                    <div>
                      <strong>{prova.materia}</strong> 
                      <small>{formatarData(prova.data)} - {prova.descricao}</small>
                    </div>
                    <button 
                        onClick={() => toggleConclusao(prova.id)} 
                        className={`${styles.btnAction} ${styles.btnSuccess}`}
                    >
                      Concluir
                    </button>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Coluna Trabalhos */}
        <section className={styles.pendingSection}>
          <h2>Trabalhos Pendentes</h2>
          <div className={styles.pendingList}>
            {trabalhosPendentes.length === 0 ? (
                <p>Nenhum trabalho pendente.</p>
            ) : (
                trabalhosPendentes.map((trabalho) => (
                  <div key={trabalho.id} className={styles.taskItem}>
                    <div>
                      <strong>{trabalho.materia}</strong>
                      <small>{formatarData(trabalho.data)} - {trabalho.descricao}</small>
                    </div>
                    <button 
                        onClick={() => toggleConclusao(trabalho.id)} 
                        className={`${styles.btnAction} ${styles.btnPrimary}`}
                    >
                      Entregar
                    </button>
                  </div>
                ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};