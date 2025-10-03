import { useState } from "react";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import styles from "./Register.module.css";

function Register({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5173/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro bem-sucedido! Você pode fazer login agora.");
        onNavigateToLogin();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ocorreu um erro ao registrar.");
      }
    } catch {
      setError(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <h1 className={styles.title}>LearnFlix</h1>
          <p className={styles.subtitle}>
            O gerenciamento educacional a um clique de distância!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? "Criando Conta..." : "Criar Conta"}
          </Button>
        </form>

        <div className={styles.footer}>
          Já tem uma conta?{" "}
          <span className={styles.link} onClick={onNavigateToLogin}>
            Fazer login
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Register;
