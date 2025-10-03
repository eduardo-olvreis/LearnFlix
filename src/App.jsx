import { useState } from 'react'

import Aluno from "./pages/Dashboards/Aluno/Aluno"
import Professor from "./pages/Dashboards/Professor/Professor"
import Gestor from './pages/Dashboards/Gestor/Gestor'

function App() {

  const [page, setPage] = useState("aluno")

  const handlePage = () =>{
    setPage("")
  }

  return (
    <div className="App">
      {page === "aluno" && (<Aluno name="Eduardo" user="Aluno"/>)}
      {page === "professor" && (<Professor name="Ermelindo" user="Professor"/>)}
    </div>
  )
}

export default App
