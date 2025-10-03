import Header from "../../../components/Dashboards/Header/Header"

export default function Aluno({name, user}){
    return(
        <section>
            <Header name={name} user={user}></Header>
            <h3>Tela Aluno</h3>
        </section>
    )
}