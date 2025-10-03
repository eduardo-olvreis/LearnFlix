import Header from "../../../components/Dashboards/Header/Header"

export default function Professor({name, user, onNavigateToLogin}){
    return(
        <section>
            <Header name={name} user={user} onNavigateToLogin={onNavigateToLogin}></Header>
            <h3>Tela Professor</h3>
        </section>
    )
}