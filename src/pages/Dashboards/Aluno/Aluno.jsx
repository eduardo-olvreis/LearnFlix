import { useLocation, Outlet } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";

const alunoNavLinks = [
  { path: "/aluno", label: "Início" },
  { path: "/aluno/recursos", label: "Meus Cursos" },
  { path: "/aluno/notas", label: "Notas" },
  { path: "/", label: "Sair"}
];

export default function Aluno() {
  const location = useLocation();

  const userName = location.state?.user?.name || "Usuário"

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
