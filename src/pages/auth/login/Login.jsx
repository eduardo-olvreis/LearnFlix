import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import styles from "./Login.module.css";

import LearnFlixLogo from "../../../assets/images/Learnflix-logo.png";

function Login() {
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
      const storedUsers = JSON.parse(localStorage.getItem("users")) || []; // Pega todos os usuários do localStorage

      const userFound = storedUsers.find(
        // Busca e validação das credenciais
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (userFound) {
        sessionStorage.setItem(`loggedInUser`, JSON.stringify(userFound))
        console.log("Login realizado com sucesso!", userFound.email);

        if(userFound.role === "Gestor"){
          navigate("/gestor", {state: {user: userFound}})
        } else if(userFound.role === "professor"){
          navigate("/professor", {state: {user: userFound}})
        } else{
          navigate("/aluno", {state: {user: userFound}})
        }

      } else {
        setError("Email ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError("Erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <img
            src={LearnFlixLogo}
            alt="Logo LearnFlix"
            className={styles.logo}
          />
          <h1 className={styles.title}>Bem-vindo de volta!</h1>
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

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className={styles.footer}>
          novo por aqui?{" "}
          <span className={styles.link} onClick={() => navigate("/register")}>
            Registrar
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Login;
