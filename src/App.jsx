import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Gestor from "./pages/Dashboards/Gestor/Gestor";
import Professor from "./pages/Dashboards/Professor/Professor";
import Aluno from "./pages/Dashboards/Aluno/Aluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aluno" element={<Aluno name="Eduardo" user="Aluno" />} />
        <Route path="/professor" element={<Professor name="Ermelindo" user="Professor" />} />
        <Route path="/gestor" element={<Gestor name="Claudio" user="Gestor" />} />
      </Routes>
    </Router>
  );
}

export default App;
