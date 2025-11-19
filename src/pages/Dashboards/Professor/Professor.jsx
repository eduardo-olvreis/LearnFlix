import { useLocation, Outlet } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header"

const professorNavLinks = [
    { path: "/", label: "Sair"}
]

export default function Professor(){
    const location = useLocation();
    
    const userName = location.state?.user?.name || "Usuário"

    return(
        <section>
            <Header 
                name={userName} 
                user={"Professor"} 
                navLinks={professorNavLinks}>
            </Header>
            <main>
                <Outlet/>
            </main>
        </section>
    )
}