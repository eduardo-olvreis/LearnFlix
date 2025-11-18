import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

import GestorHome from "./pages/Dashboards/Gestor/Home/GestorHome";
import Gestor from "./pages/Dashboards/Gestor/Gestor";
import UserRegistration from "./pages/Dashboards/Gestor/UserRegistration/UserRegistration";

import Professor from "./pages/Dashboards/Professor/Professor";

import Aluno from "./pages/Dashboards/Aluno/Aluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aluno" element={<Aluno/>} />
        <Route path="/professor" element={<Professor/>}/>
        <Route path="/gestor" element={<Gestor/>}>
          <Route index element={<GestorHome />} />
          <Route path="cadastrar-usuario" element={<UserRegistration/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
