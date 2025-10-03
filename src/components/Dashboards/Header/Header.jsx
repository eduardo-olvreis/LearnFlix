import style from "./Header.module.css"

export default function Header({name, user}){
    return(
        <header className={style.container}>
            <div className={style.info}>
                <h2>
                    Olá, <span>{name}!</span>
                </h2>
                <h3>{user}</h3>
            </div>
            <div>
                <img src="../src/assets/images/menu-icon.svg" alt="Icone do menu lateral" />
            </div>
        </header>
    )
}