import { useState } from 'react';
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import styles from "./AgendarAvaliacao.module.css";

export default function AgendarAvaliacao() {
  const [materia, setMateria] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('prova'); 

  const handleAgendar = (e) => {
    e.preventDefault();

    const novaAvaliacao = {
      id: Date.now(),
      materia,
      data,
      descricao,
      tipo
    };

    const avaliacoesSalvas = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
    const listaAtualizada = [...avaliacoesSalvas, novaAvaliacao];
    localStorage.setItem('avaliacoes', JSON.stringify(listaAtualizada));
    
    alert('Atividade agendada com sucesso!');
    
    setMateria('');
    setData('');
    setDescricao('');
    setTipo('prova');
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Agendar Nova Atividade</h2>
        
        <form onSubmit={handleAgendar} className={styles.form}>
          
          <Input 
            type="text" 
            placeholder="Nome da atividade" 
            value={materia} 
            onChange={(e) => setMateria(e.target.value)} 
            required 
          />
          
          <div className={styles.inputContainer}>
            <label className={styles.label}>
                Tipo de Atividade:
            </label>
            <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)} 
                className={styles.selectInput}
            >
                <option value="prova">Prova</option>
                <option value="trabalho">Trabalho</option>
            </select>
          </div>
          
          <Input 
            type="date" 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
            required 
          />

          <Input 
            type="text" 
            placeholder="Conteúdos" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
          />

          <Button type="submit">Agendar</Button>
        </form>
      </div>
      
    </div>
  );
};