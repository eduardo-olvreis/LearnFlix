import { useNavigate, Outlet } from "react-router-dom";
import Header from "../../../components/Dashboards/Header/Header";

const alunoNavLinks = [
  { path: "/aluno", label: "Início" },
  { path: "/aluno/recursos", label: "Meus Cursos" },
  { path: "/aluno/notas", label: "Notas" },
  { path: "/", label: "Sair"}
];

export default function Aluno({ name, user }) {
  const navigate = useNavigate();

  {/* Função provisória para alterar entre páginas */}
  const handleGestor = () => {
    navigate("/gestor")
  }

  return (
    <section>
      <Header
        name={name}
        user={user}
        navLinks={alunoNavLinks}
      ></Header>
      <main>
        <Outlet />
      </main>
      <button onClick={handleGestor}>Área do Gestor - Provisório</button>
    </section>
  );
}
