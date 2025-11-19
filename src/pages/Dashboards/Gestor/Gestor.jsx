import { useLocation, Outlet } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";

const gestorNavLinks = [
  { path: "/", label: "Sair" }
]

export default function Gestor() {
  const location = useLocation();

  const userName = location.state?.user?.name || "Usuário"

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
