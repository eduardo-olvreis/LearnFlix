import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./PerfilAluno.module.css";

import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";

const PerfilAluno = () => {
  const context = useOutletContext();
  const setUserName = context ? context.setUserName : () => {};
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    foto: null,
    novaSenha: "",
  });

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("currentUser");
      if (storedData) {
        const userData = JSON.parse(storedData);
        setFormData((prev) => ({
          ...prev,
          nome: userData.nome || "",
          email: userData.email || "",
          foto: userData.foto || null,
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do Local Storage:", error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, foto: imageUrl });
      console.log("Arquivo de foto pronto para upload:", file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const storedCurrentData = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      const updatedCurrentData = {
        ...storedCurrentData,
        nome: formData.nome,
        foto: formData.foto,
      };

      if (formData.novaSenha) {
        updatedCurrentData.senha = formData.novaSenha;
      }

      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentData));

      const userIndex = storedUsers.findIndex(
        (u) => u.email === updatedCurrentData.email
      );

      if (userIndex !== -1) {
        const updatedUsers = [...storedUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          name: updatedCurrentData.nome,
          foto: updatedCurrentData.foto,
          password:
            updatedCurrentData.senha || updatedUsers[userIndex].password,
        };
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      if (setUserName) {
        setUserName(formData.nome);
      }

      alert("Perfil e senha atualizados com sucesso!");
      setFormData((prev) => ({ ...prev, novaSenha: "" }));
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Falha ao salvar o perfil.");
    }
  };

  return (
    <div className={styles.perfilContainer}>
      <Card className={styles.cardOverrides}>
        <h1 className={styles.pageTitle}>Meu Perfil</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.photoSection}>
            <img
              src={formData.foto || "placeholder-default.jpg"}
              alt="Foto do Aluno"
              className={styles.profileImage}
            />

            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoChange}
              id="photo-upload"
              className={styles.fileInput}
            />
            <label htmlFor="photo-upload" className={styles.photoButton}>
              Alterar Foto
            </label>
          </div>

          <Input
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Institucional"
            type="email"
            name="email"
            value={formData.email}
            readOnly={true}
          />

          <Input
            label="Nova Senha"
            type="password"
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
            placeholder="Deixe em branco para não alterar"
          />

          <Button type="submit" className={styles.submitButton}>
            Salvar Alterações
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PerfilAluno;
