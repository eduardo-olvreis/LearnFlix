import { useNavigate } from "react-router-dom";
import { useState } from "react"
import style from "./Header.module.css"

export default function Header({name, user, onNavigateToLogin}){

    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        setVisible(!visible)
    }

    const handleLogout = () => {
        navigate("/")
    }

    return(
        <header className={style.container}>
            <div className={style.info}>
                <h2>
                    Olá, <span>{name}!</span>
                </h2>
                <h3>{user}</h3>
            </div>
            <div className={style.botaoMenu}>
                <button onClick={handleClick}>
                    <img src="../src/assets/images/menu-icon.svg" alt="Icone do menu lateral" />
                </button>
            </div>
            <div className={`${style.menu} ${visible ? style.visible : ''}`}>
                <ul>
                    <li><p onClick={handleLogout}>Sair</p></li>
                </ul>
            </div>
        </header>
    )
}