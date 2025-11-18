import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "./GestorHome.module.css"

export default function GestorHome(){
    const navigate = useNavigate()
    const handleUserRegister = () => {
        navigate("cadastrar-usuario")
    }

    {/* Função provisória para alterar entre páginas */}
    const handleAluno = () => {
        navigate("/aluno")
    }

    return (
        <div className={styles.container}>
            <div>
                <h2>Painel do Gestor</h2>
                <p>Selecione uma das funcionalidades abaixo:</p>
            </div>
            <div className={styles.buttons}>
                <Button onClick={handleUserRegister}>Cadastrar Novo Usuário</Button>
                <Button onClick={() => {}}>Gerenciar Usuários - Em Breve</Button>
            </div>
            <button onClick={handleAluno}>Área do Aluno - Provisório</button>
        </div>
    )
}