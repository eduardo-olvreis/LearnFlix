import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";

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
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.name) {
        setUserName(loggedInUser.name);
      }
    } catch (error) {
      console.error("Falha ao ler os dados do usuário da sessão:", error);
      navigate("/");
    }
  }, []);

  return (
    <section>
      <Header name={userName} user={"Aluno"} navLinks={alunoNavLinks} />
      <main>
        <Outlet />
      </main>
    </section>
  );
}
