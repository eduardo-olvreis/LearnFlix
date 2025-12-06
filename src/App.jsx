import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

import GestorHome from "./pages/Gestor/components/Home/GestorHome";
import Gestor from "./pages/Gestor/Gestor";
import UserRegistration from "./pages/Gestor/components/UserRegistration/UserRegistration";
import UserManagement from "./pages/Gestor/components/UserManagement/UserManagement";
import UserEdit from "./pages/Gestor/components/UserManagement/UserEdit";

import Professor from "./pages/Professor/Professor";

import Aluno from "./pages/Aluno/Aluno";
import DashboardAluno from "./pages/Aluno/components/DashboardAluno/DashboardAluno";
import ListaRecursos from "./pages/Aluno/components/ListaRecursos/ListaRecursos";
import NotasAluno from "./pages/Aluno/components/NotasAluno/NotasAluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/professor" element={<Professor/>}/>
        <Route path="/gestor" element={<Gestor/>}>
          <Route index element={<GestorHome />} />
          <Route path="cadastrar-usuario" element={<UserRegistration/>}/>
          <Route path="gerenciar-usuario" element={<UserManagement/>}/>
          <Route path="editar-usuario" element={<UserEdit/>}/>
        </Route>
        <Route path="/aluno" element={<Aluno name="Eduardo" user="Aluno" />}>
          <Route index element={<DashboardAluno />} />
          <Route path="recursos" element={<ListaRecursos />} />

          <Route path="notas" element={<NotasAluno />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
