import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";
import { useEffect, useState } from "react";

export default function Gestor() {

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
        user={"Gestor"}>
      </Header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
