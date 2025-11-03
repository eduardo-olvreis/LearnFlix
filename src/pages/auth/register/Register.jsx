import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import styles from "./Register.module.css";

import LearnFlixLogo from "../../../assets/images/Learnflix-logo.png";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const storedUsers =
        JSON.parse(localStorage.getItem("users")) ||
        []; /* Vai pegar todos os usuários cadastrados no localStorage */
      const exists = storedUsers.some(
        (u) => u.email === formData.email
      ); /* Verificação de email duplicado */

      if (exists) {
        setError("Esse email já está cadastrado.");
        setLoading(false);
        return;
      }

      const updatedUsers = [
        ...storedUsers,
        formData,
      ]; /* Array com os usuários antigos e o novo */
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      navigate("/");
    } catch {
      setError("Erro ao salvar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <Card>
        <div className={styles.header}>
          <img
            src={LearnFlixLogo}
            alt="Logo LearnFlix"
            className={styles.logo}
          />
          <h1 className={styles.title}>Junte-se ao LearnFlix</h1>
          <p className={styles.subtitle}>Ensinar, Conectar</p>
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

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? "Criando Conta..." : "Criar Conta"}
          </Button>
        </form>

        <div className={styles.footer}>
          Já tem cadastro?{" "}
          <span className={styles.link} onClick={() => navigate("/")}>
            Fazer login
          </span>
        </div>
      </Card>
    </section>
  );
}

export default Register;
