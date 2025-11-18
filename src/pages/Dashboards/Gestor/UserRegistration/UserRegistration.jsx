import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button";
import style from "./UserRegistration.module.css"

export default function UserRegistration(){

    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/gestor")
    }

    return(
        <section className={style.container}>
            <form action="">
                <div>
                    <Input label={"Email"} placeholder={"email@usuario.com"}></Input>
                </div>
                <div>
                    <Input label={"Senha"} placeholder={"Senha do usuário"}></Input>
                </div>
            </form>
            <Button onClick={handleBack}>Voltar</Button>
        </section>
    )
}