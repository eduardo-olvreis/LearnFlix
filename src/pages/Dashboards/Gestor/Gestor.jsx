import Header from "../../../components/Dashboards/Header/Header"

export default function Gestor({name, user, onNavigateToLogin}){
    return(
        <section>
            <Header name={name} user={user} onNavigateToLogin={onNavigateToLogin}></Header>
            <h3>Tela Gestor</h3>
        </section>
    )
}