import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

const alunoNavLinks = [
  { path: "/aluno", label: "Início" },
  { path: "/aluno/recursos", label: "Meus Cursos" },
  { path: "/aluno/notas", label: "Notas" }
];

export default function Aluno() {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("Usuário")

    useEffect(() => {
        try {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
        if(loggedInUser && loggedInUser.name){
            setUserName(loggedInUser.name)
        }
        } catch(error){
        console.error("Falha ao ler os dados do usuário da sessão:",error)
        navigate("/")
        }
    })

  return (
    <section>
      <Header
        name={userName}
        user={"Aluno"}
        navLinks={alunoNavLinks}
      ></Header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
