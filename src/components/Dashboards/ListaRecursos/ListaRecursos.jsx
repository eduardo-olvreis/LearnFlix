import React, { useState, useEffect } from "react";
import styles from "./ListaRecursos.module.css";

const API_URL = "https://api.sampleapis.com/codingresources/codingResources";

function ListaRecursos() {
  const [recursos, setRecursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarRecursos();
  }, []);

  if (carregando) {
    return <div className={styles.loadingMessage}>Carregando recursos...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>Erro: {error}</div>;
  }

  if (recursos.length === 0) {
    return <div>Nenhum recurso encontrado.</div>;
  }

  return (
    <div className={styles.listaContainer}>
      <h1>Recursos de Programação ({recursos.length})</h1>
      <ul className={styles.recursosLista}>
        {recursos.map((recurso) => (
          <li key={recurso.id} className={styles.recursoItem}>
            <h3>{recurso.description}</h3>
            <p>
              <strong>Tipo:</strong> {recurso.types && recurso.types.join(", ")}
            </p>
            {recurso.tags && recurso.tags.length > 0 && (
              <p>
                <strong>Tags:</strong> {recurso.tags.join(", ")}
              </p>
            )}
            <a
              href={recurso.url}
              className={styles.resourceLink}
            >
              Acessar Recurso
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaRecursos;
