import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../../../components/Button/Button";

export default function UserEdit(){

    const location = useLocation()
    const navigate = useNavigate()

    const emailUser = location.state?.emailUsuario;

    const rawUsers = localStorage.getItem("users")
    const users = JSON.parse(rawUsers) || []
    const usuarioEncontrado = users.find((user) => user.email === emailUser)

    if (!usuarioEncontrado){
        return(
            <section>
                <p>Ocorreu um erro ao localizar o usuário</p>
            </section>
        )
    }

    return(
        <section>
            <h2>Editando usuário: {usuarioEncontrado.name}</h2>
            <div>
                <p>Nome: {usuarioEncontrado.name}</p>
                <p>Email: {usuarioEncontrado.email}</p>
                <p>Senha: {usuarioEncontrado.password}</p>
                <Button onClick={() => navigate("../gerenciar-usuario")}>Voltar</Button>
            </div>
        </section>
    )
}