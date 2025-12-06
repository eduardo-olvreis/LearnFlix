import React, { useState, useEffect } from "react";
import styles from "./PerfilAluno.module.css";

const PerfilAluno = () => {
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
      const storedData = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      const updatedData = {
        ...storedData,
        nome: formData.nome,
        foto: formData.foto,
      };

      if (formData.novaSenha) {
        updatedData.senha = formData.novaSenha;
        console.log("Senha alterada.");
      }

      localStorage.setItem("currentUser", JSON.stringify(updatedData));

      alert("Perfil atualizado com sucesso no Local Storage!");
      setFormData((prev) => ({ ...prev, novaSenha: "" }));
    } catch (error) {
      console.error("Erro ao salvar dados no Local Storage:", error);
      alert("Falha ao salvar o perfil.");
    }
  };

  return (
    <div className={styles.perfilContainer}>
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

        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="novaSenha">Nova Senha</label>
          <input
            type="password"
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
            className={styles.input}
            placeholder="Deixe em branco para não alterar"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default PerfilAluno;
