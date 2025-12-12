import { useState } from 'react';
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"

export default function AgendarAvaliacao () {
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
    <div style={{ padding: '20px' }}>
      <h2>Agendar Nova Atividade</h2>
      <form onSubmit={handleAgendar} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        
        <Input 
          type="text" 
          placeholder="Nome da Matéria (ex: Web III)" 
          value={materia} 
          onChange={(e) => setMateria(e.target.value)} 
          required 
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', color: '#555', fontWeight: 'bold' }}>
                Tipo de Atividade:
            </label>
            <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)} 
                style={{ 
                    padding: '12px', 
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
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
          placeholder="Descrição (ex: Capítulos 1 a 4)" 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
        />

        <Button type="submit">Agendar</Button>
      </form>
    </div>
  );
};