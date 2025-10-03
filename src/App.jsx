import { useState } from 'react'

import Register from './pages/auth/register/Register'

import Aluno from "./pages/Dashboards/Aluno/Aluno"
import Professor from "./pages/Dashboards/Professor/Professor"
import Gestor from './pages/Dashboards/Gestor/Gestor'

function App() {

  const [currentPage, setCurrentPage] = useState("register");

  return (
    <div className="App">
      {currentPage !== "register" ? (
        <Login onNavigateToRegister={() => setCurrentPage("register")} />
      ) : (
        <Register onNavigateToLogin={() => setCurrentPage("login")} />
      )}

      {currentPage === "aluno" && (<Aluno name="Eduardo" user="Aluno"/>)}
      {currentPage === "professor" && (<Professor name="Ermelindo" user="Professor"/>)}
    </div>
  );
}

export default App;
