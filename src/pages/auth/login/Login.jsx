import { useState } from "react"
import style from "./Login.module.css"

function Login({onNavigateToRegister, onNavigateToGestor}){
    return(
        <section>
            <h3 onClick={onNavigateToRegister}>Registre-se</h3>
            <h3 onClick={onNavigateToGestor}>Entrar</h3>
        </section>
    )
}

export default Login