import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "./UserManagement.module.css"

export default function UserManagement(){

    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/gestor")
    }

    const handleEdit = (email) => {
        navigate("/gestor/editar-usuario", {
            state: { emailUsuario: email }
        })
    }

    const rawUsers = localStorage.getItem("users")
    const users = JSON.parse(rawUsers) || []

    const listarUsuarios = (cargo) => {
        const usuariosFiltrados = users.filter((user) => user.role.toLowerCase() === cargo.toLowerCase())

        if(usuariosFiltrados.length === 0){
            return <p style={{textAlign: "center"}}>Nenhum usuário com o cargo {cargo} registrado.</p>
        }

        return usuariosFiltrados.map((user, index) => (
            <div key={index} className={styles.usuarioDados} onClick={() => handleEdit(user.email)}>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        ))
    }

    return(
        <section className={styles.container}>
            <div className={styles.containerUsuarios}>
                {/* Depois tem que criar um componente para renderizar isso e despoluir */}
                <h2 className={styles.titulo}>Lista de usuários registrados</h2>
                <div className={styles.usuarios}>
                    <div className={styles.containerCargo}>
                        <h3>Gestores</h3>
                        {listarUsuarios("gestor")}
                    </div>
                    <div className={styles.containerCargo}>
                        <h3>Professores</h3>
                        {listarUsuarios("professor")}
                    </div>
                    <div className={styles.containerCargo}>
                        <h3>Alunos</h3>
                        {listarUsuarios("aluno")}
                    </div>
                </div>
            </div>
            <Button onClick={handleBack}>Voltar</Button>
        </section>
    )
}