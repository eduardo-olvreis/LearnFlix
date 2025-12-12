import { useState, useEffect } from 'react';
import Input from "../../../../components/Input/Input"; 
import Button from "../../../../components/Button/Button";
import styles from "./LancarNotas.module.css";

export default function LancarNotas() {
  const [alunosReais, setAlunosReais] = useState([]);
  const [atividadesSalvas, setAtividadesSalvas] = useState([]);
  const [entregas, setEntregas] = useState([]); 
  const [notasLancadas, setNotasLancadas] = useState([]);

  const [alunoEmail, setAlunoEmail] = useState('');
  const [atividadeId, setAtividadeId] = useState('');
  const [nota, setNota] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const listaAlunos = users.filter(user => user.role === "aluno");
    setAlunosReais(listaAlunos);

    const atividades = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    setAtividadesSalvas(atividades);

    const entregasFeitas = JSON.parse(localStorage.getItem("entregasDetalhadas")) || [];
    setEntregas(entregasFeitas);

    const bancoNotas = JSON.parse(localStorage.getItem('bancoNotas') || '[]');
    setNotasLancadas(bancoNotas);

    if (listaAlunos.length > 0) setAlunoEmail(listaAlunos[0].email);
    if (atividades.length > 0) setAtividadeId(atividades[0].id);

  }, []);

  const verificarStatusEntrega = () => {
    const entregou = entregas.find(
      e => e.alunoEmail === alunoEmail && e.atividadeId == atividadeId
    );
    return entregou ? "Entregue" : "Pendente";
  };

  const getNotaDoAluno = (emailDoAluno) => {
    if (!atividadeId) return null;
    
    const notaEncontrada = notasLancadas.find(
        n => n.studentEmail === emailDoAluno && n.atividadeId == atividadeId
    );

    return notaEncontrada ? notaEncontrada.valor : null;
  };

  const handleLancarNota = (e) => {
    e.preventDefault();

    if (!alunoEmail || !atividadeId) {
      alert("Selecione um aluno e uma atividade.");
      return;
    }

    const alunoObj = alunosReais.find(a => a.email === alunoEmail);
    const atividadeObj = atividadesSalvas.find(a => a.id == atividadeId);

    const novaNota = {
      id: Date.now(),
      atividadeId: atividadeId,
      studentEmail: alunoEmail,
      studentName: alunoObj.name,
      disciplina: atividadeObj.materia,
      nomeAvaliacao: atividadeObj.descricao || "Sem descrição",
      tipo: atividadeObj.tipo,
      valor: parseFloat(nota)
    };

    const notasSalvas = JSON.parse(localStorage.getItem('bancoNotas') || '[]');
    
    const notasFiltradas = notasSalvas.filter(
        n => !(n.studentEmail === alunoEmail && n.atividadeId == atividadeId)
    );
    
    const listaAtualizada = [...notasFiltradas, novaNota];
    
    localStorage.setItem('bancoNotas', JSON.stringify(listaAtualizada));
    
    setNotasLancadas(listaAtualizada);

    alert(`Nota ${nota} lançada para ${alunoObj.name}!`);
    setNota('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lançamento de Notas</h2>
      
      <div className={styles.gridContainer}>
        
        <form onSubmit={handleLancarNota} className={styles.formContainer}>
          
          <div className={styles.inputContainer}>
            <label className={styles.label}>Selecione a Atividade:</label>
            <select 
              value={atividadeId}
              onChange={(e) => setAtividadeId(e.target.value)}
              className={styles.input}
            >
              {atividadesSalvas.length === 0 && <option>Nenhuma atividade agendada</option>}
              {atividadesSalvas.map(ativ => (
                <option key={ativ.id} value={ativ.id}>
                  {ativ.materia} - {ativ.tipo} ({ativ.data})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Selecione o Aluno:</label>
            <select 
              value={alunoEmail}
              onChange={(e) => setAlunoEmail(e.target.value)}
              className={styles.input}
            >
              {alunosReais.length === 0 && <option>Nenhum aluno cadastrado</option>}
              {alunosReais.map(aluno => (
                <option key={aluno.email} value={aluno.email}>
                  {aluno.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.statusBox}>
             Status do Aluno: <strong>{verificarStatusEntrega()}</strong>
          </div>

          <Input 
            type="number" 
            placeholder="Nota (0 a 10)" 
            value={nota} 
            onChange={(e) => setNota(e.target.value)} 
            min="0" max="10" step="0.1"
            required 
          />

          <Button type="submit">Salvar Nota</Button>
        </form>

        <div className={styles.listContainer}>
          <h3 className={styles.listHeader}>Lista de Alunos</h3>
          <span className={styles.listSubtext}>
            (Notas referentes à atividade selecionada)
          </span>

          {alunosReais.length === 0 ? <p>Sem alunos.</p> : (
            <ul className={styles.studentList}>
                {alunosReais.map(a => {
                    const notaAluno = getNotaDoAluno(a.email);
                    
                    return (
                        <li key={a.email} className={styles.studentItem}>
                            <div>
                                <strong>{a.name}</strong> <br/>
                                <small>{a.email}</small>
                            </div>
                            
                            {notaAluno !== null ? (
                                <span className={`${styles.gradeBadge} ${notaAluno >= 7 ? styles.approved : styles.reproved}`}>
                                    {notaAluno.toFixed(1)}
                                </span>
                            ) : (
                                <span className={styles.noGrade}>-</span>
                            )}
                        </li>
                    )
                })}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}