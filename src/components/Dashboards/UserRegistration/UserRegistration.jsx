import { useState } from "react"
import style from "./UserRegistration.module.css"

export default function UserRegistration(){

    const [formData, setFormData] = useState("")

    return(
        <section className={style.container}>
            <button>Clique aqui para cadastrar usuarios</button>
        </section>
    )
}