import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "./GestorHome.module.css";

export default function GestorHome() {
    const navigate = useNavigate();

    const handleUserRegister = () => {
        navigate("cadastrar-usuario");
    };

    const handleUserManagement = () => {
        navigate("gerenciar-usuario");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.titulo}>Painel do Gestor</h2>
                    <p className={styles.subtitulo}>Selecione uma das funcionalidades abaixo:</p>
                </div>
                
                <div className={styles.buttons}>
                    <Button onClick={handleUserRegister}>
                        Cadastrar Novo Usuário
                    </Button>
                    <Button onClick={handleUserManagement}>
                        Gerenciar Usuários
                    </Button>
                </div>
            </div>
        </div>
    );
}