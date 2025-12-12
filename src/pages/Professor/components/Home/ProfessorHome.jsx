import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "../../../Gestor/components/Home/GestorHome.module.css";

export default function ProfessorHome() {
    const navigate = useNavigate()

    const handleAgendarAvaliacao = () => {
        navigate("agendar-avaliacao")
    }

    const handleLancarNota = () => {
        navigate("lancar-nota")
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.titulo}>Painel do Professor</h2>
                    <p className={styles.subtitulo}>Selecione uma das funcionalidades abaixo:</p>
                </div>
                
                <div className={styles.buttons}>
                    <Button onClick={handleAgendarAvaliacao}>
                        Agendar Avaliações
                    </Button>
                    <Button onClick={handleLancarNota}>
                        Lançar Notas
                    </Button>
                </div>
            </div>
        </div>
    );
}