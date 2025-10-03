import Header from "../../../components/Dashboards/Header/Header"

export default function Aluno({name, user, onNavigateToLogin}){
    return(
        <section>
            <Header name={name} user={user} onNavigateToLogin={onNavigateToLogin}></Header>
            <h3>Tela Aluno</h3>
        </section>
    )
}