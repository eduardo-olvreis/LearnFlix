import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const alunoNavLinks = [
  { path: "/aluno", label: "Início" },
  { path: "/aluno/recursos", label: "Estudar" },
  { path: "/aluno/notas", label: "Minhas notas" },
  { path: "/aluno/perfil", label: "Perfil" },
];

export default function Aluno() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Usuário");

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("currentUser");
      const loggedInUser = sessionStorage.getItem("loggedInUser");

      if (storedData) {
        const userData = JSON.parse(storedData);
        setUserName(userData.nome || userData.name || "Aluno");
      } else if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        setUserName(userData.name);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Falha ao ler os dados do usuário:", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <section>
      <Header name={userName} user={"Aluno"} navLinks={alunoNavLinks} />
      <main>
        <Outlet context={{ setUserName }} />
      </main>
    </section>
  );
}
