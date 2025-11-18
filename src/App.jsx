import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

import Gestor from "./pages/Dashboards/Gestor/Gestor";

import Professor from "./pages/Dashboards/Professor/Professor";

import Aluno from "./pages/Dashboards/Aluno/Aluno";
import DashboardAluno from "./components/Dashboards/DashboardAluno/DashboardAluno";
import ListaRecursos from "./components/Dashboards/ListaRecursos/ListaRecursos";
import NotasAluno from "./components/Dashboards/NotasAluno/NotasAluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aluno" element={<Aluno name="Eduardo" user="Aluno" />}>
          <Route index element={<DashboardAluno />} />

          <Route path="recursos" element={<ListaRecursos />} />

          <Route path="notas" element={<NotasAluno />} />
        </Route>
        <Route
          path="/professor"
          element={<Professor name="Ermelindo" user="Professor" />}
        />
        <Route
          path="/gestor"
          element={<Gestor name="Claudio" user="Gestor" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
