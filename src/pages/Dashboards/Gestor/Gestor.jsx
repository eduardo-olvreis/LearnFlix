import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";
import GestorHome from "./Home/GestorHome";
import UserRegistration from "./UserRegistration/UserRegistration";

export default function Gestor() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = location.state?.user?.name || "Usuário"

  return (
    <section>
      <Header name={userName} user={"Gestor"} onLogout={() => navigate("/")}></Header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
