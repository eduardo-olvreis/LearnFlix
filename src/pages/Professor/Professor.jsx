import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header"
import { useEffect, useState } from "react";

export default function Professor(){

    const navigate = useNavigate()

    const [userName, setUserName] = useState("Usuário")

    const professorLinks = [
        { path: "/professor", label: "Início" },
        { path: "/professor/agendar-avaliacao", label: "Agendar Avaliações" },
        { path: "/professor/lancar-nota", label: "Lançar Notas" }
    ]

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

    return(
        <section>
            <Header 
                name={userName} 
                user={"Professor"}
                navLinks={professorLinks}>
            </Header>
            <main>
                <Outlet/>
            </main>
        </section>
    )
}