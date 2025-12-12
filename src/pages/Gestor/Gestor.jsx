import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

export default function Gestor() {

  const navigate = useNavigate()

  const [userName, setUserName] = useState("Usuário")

  const gestorNavLinks = [
  { path: "/gestor", label: "Início" },
  { path: "/gestor/cadastrar-usuario", label: "Cadastrar Usuários" },
  { path: "/gestor/gerenciar-usuario", label: "Gerenciar Usuários" }
];


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
  }, [])

  return (
    <section>
      <Header 
        name={userName} 
        user={"Gestor"}
        navLinks={gestorNavLinks}>
      </Header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
