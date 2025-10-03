import { useState } from 'react'

import Register from './pages/auth/register/Register'
import Login from './pages/auth/login/Login'

import Aluno from "./pages/Dashboards/Aluno/Aluno"
import Professor from "./pages/Dashboards/Professor/Professor"
import Gestor from './pages/Dashboards/Gestor/Gestor'

function App() {

  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div className="App">
      {/* Parametro onNavigateToGestor é apenas provisório para testes, no futuro será implementado a troca de página de acordo com que cargo cada usuário ocupa */}
      {currentPage === "login" && (<Login onNavigateToRegister={() => setCurrentPage("register")} onNavigateToGestor={() => setCurrentPage("gestor")}/>) }
      {currentPage === "register" && (<Register onNavigateToLogin={() => setCurrentPage("login")} />)}
      {currentPage === "aluno" && (<Aluno name="Eduardo" user="Aluno"/>)}
      {currentPage === "professor" && (<Professor name="Ermelindo" user="Professor"/>)}
      {currentPage === "gestor" && (<Gestor name="Claudio" user="Gestor"/>)}
    </div>
  );
}

export default App;
