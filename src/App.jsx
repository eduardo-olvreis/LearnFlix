import { useState } from "react";
import Register from "./pages/auth/register/register";

function App() {
  const [currentPage, setCurrentPage] = useState("register");
  return (
    <div className="App">
      {currentPage === "Register" ? (
        <Login onNavigateToRegister={() => setCurrentPage("register")} />
      ) : (
        <Register onNavigateToLogin={() => setCurrentPage("login")} />
      )}
    </div>
  );
}

export default App;
