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

      {/* Os nomes e usuarios também estão apenas provisóriamente, no futuro será implementado o nome e cargo aautomaticamente de acordo com o login do usuário */}
      {currentPage === "aluno" && (<Aluno name="Eduardo" user="Aluno" onNavigateToLogin={() => setCurrentPage("login")}/>)}
      {currentPage === "professor" && (<Professor name="Ermelindo" user="Professor" onNavigateToLogin={() => setCurrentPage("login")}/>)}
      {currentPage === "gestor" && (<Gestor name="Claudio" user="Gestor" onNavigateToLogin={() => setCurrentPage("login")}/>)}
    </div>
  );
}

export default App;
