import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button";
import style from "./UserRegistration.module.css"
import { useState } from "react";

export default function UserRegistration(){

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        role: "",
        email: "",
        senha: ""
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    }; 

    const handleBack = () => {
        navigate("/gestor")
    }

    return(
        <section className={style.container}>
            <form action="">
                <div className={style.role}>
                    <p>Tipo de Acesso:</p>
                    <div className={style.itens}>
                        <div className={style.item}>
                            <input type="radio" name="role" id="professor"/>
                            <label htmlFor="professor">Professor</label>
                        </div>
                        <div className={style.item}>
                            <input type="radio" name="role" id="aluno"/>
                            <label htmlFor="aluno">Aluno</label>
                        </div>
                    </div>
                </div>
                <div>
                    <Input type={"email"}label={"Email"} placeholder={"email@usuario.com"}></Input>
                </div>
                <div>
                    <Input type={"password"} label={"Senha"} placeholder={"Senha do usuário"}></Input>
                </div>
            </form>
            <Button onClick={handleBack}>Voltar</Button> 
        </section>
    )
}