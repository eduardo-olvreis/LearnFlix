import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button";
import style from "./UserRegistration.module.css"
import { useState } from "react";

export default function UserRegistration(){

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        role: "",
        name: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUserData({...userData,[e.target.name]: e.target.value});
    }; 

    {/* Função para enviar os dados para o localStorage */}
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        setError(null)

        if(!userData.role || !userData.name || !userData.email || !userData.password){
            setError("Necessita preencher todos os campos.")
            setLoading(false)
            return
        }

        try{
            const storedUsers = JSON.parse(localStorage.getItem("users")) || []
            const exists = storedUsers.find((user) => user.email === userData.email)

            if(exists) {
                setError("Esse email já está cadastrado")
                setLoading(false)
                return
            }

            const updatedUsers = [...storedUsers, userData]
            localStorage.setItem("users", JSON.stringify(updatedUsers))

        } catch {
            setError("Erro ao cadastrar usuário. Tente novamente")
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate("/gestor")
    }

    return(
        <section className={style.container}>
            <form onSubmit={handleSubmit}>
                <div className={style.role}>
                    <p>Tipo de Acesso:</p>
                    <div className={style.itens}>
                        <div className={style.item}>
                            <input 
                                type="radio" 
                                name="role" 
                                id="professor" 
                                onChange={handleChange}
                                value="professor"
                                checked={userData.role === "professor"}
                            />
                            <label htmlFor="professor">Professor</label>
                        </div>
                        <div className={style.item}>
                            <input 
                                type="radio" 
                                name="role" 
                                id="aluno" 
                                onChange={handleChange}
                                value="aluno"
                                checked={userData.role === "aluno"}
                            />
                            <label htmlFor="aluno">Aluno</label>
                        </div>
                    </div>
                </div>
                <div>
                    <Input 
                        type="text"
                        label="Nome"
                        name="name"
                        placeholder={"Nome de usuário"}
                        value={userData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Input 
                        type="email"
                        label="Email"
                        name="email"
                        placeholder={"email@usuario.com"}
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Input 
                        type="password"
                        label="Senha"
                        name="password" 
                        placeholder={"Senha do usuário"}
                        value={userData.password}
                        onChange={handleChange}
                    />
                </div>
                {error && <div className={style.error}>{error}</div>}
                <Button type="submit" disabled={loading}>{loading ? "Criando Conta..." : "Criar Conta"}</Button>
            </form>
            <Button onClick={handleBack}>Voltar</Button> 
        </section>
    )
}