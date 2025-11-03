import { useNavigate } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header"

export default function Gestor({name, user}){
    const navigate = useNavigate()

    return(
        <section>
            <Header name={name} user={user} onLogout={() => navigate("/")}></Header>
            <h3>Tela Gestor</h3>
        </section>
    )
}