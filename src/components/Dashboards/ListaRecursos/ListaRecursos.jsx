import React, { useState, useEffect } from "react";

const API_URL = "https://api.sampleapis.com/codingresources/codingResources";

function ListaRecursos() {
  const [recursos, setRecursos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarRecursos() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        setRecursos(data);
      } catch (error) {
        console.error("Falha ao buscar recursos:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarRecursos();
  }, []);

  if (carregando) {
    return <div>Carregando recursos...</div>;
  }

  if (recursos.length === 0) {
    return <div>Nenhum recurso encontrado.</div>;
  }

  return (
    <div>
      <h2>Recursos de Programação ({recursos.length})</h2>
      <ul>
        {recursos.map((recurso) => (
          <li key={recurso.id}>
            <strong>{recurso.description}</strong> ({recurso.types})
            <p>Tags: {recurso.tags.join(", ")}</p>
            <a href={recurso.url} target="_blank" rel="noopener noreferrer">
              Acessar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaRecursos;
