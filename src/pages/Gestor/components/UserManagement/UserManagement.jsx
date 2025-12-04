import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";

export default function UserManagement(){

    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/gestor")
    }

    const rawUsers = localStorage.getItem("users")
    const users = JSON.parse(rawUsers) || []

    const listarUsuarios = (cargo) => {
        const usuariosFiltrados = users.filter((user) => user.role.toLowerCase() === cargo.toLowerCase())

        if(usuariosFiltrados.length === 0){
            return <p>Nenhum usuário com o cargo {cargo} registrado.</p>
        }

        return usuariosFiltrados.map((user, index) => (
            <div key={index}>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.password}</p>
            </div>
        ))
    }

    return(
        <section>
            <div>
                {/* Depois tem que criar um componente para renderizar isso e despoluir */}
                <h2>Lista de usuários registrados</h2>
                <div>
                    <h3>Gestores</h3>
                    {listarUsuarios("Gestor")}
                </div>
                <div>
                    <h3>Professores</h3>
                    {listarUsuarios("professor")}
                </div>
                <div>
                    <h3>Alunos</h3>
                    {listarUsuarios("aluno")}
                </div>
            </div>
            <Button onClick={handleBack}>Voltar</Button>
        </section>
    )
}