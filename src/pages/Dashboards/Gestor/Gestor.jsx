import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";
import ListaRecursos from "../../../components/Dashboards/ListaRecursos/ListaRecursos";

export default function Gestor() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = location.state?.user?.name || "Usuário"

  return (
    <section>
      <Header name={userName} user={"Gestor"} onLogout={() => navigate("/")}></Header>
      <h3>Tela Gestor</h3>
      <ListaRecursos />
    </section>
  );
}
