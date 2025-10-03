import Header from "../../../components/Dashboards/Header/Header"

export default function Professor({name, user}){
    return(
        <section>
            <Header name={name} user={user}></Header>
            <h3>Tela Professor</h3>
        </section>
    )
}