import Header from "../../../components/Dashboards/Header/Header"

export default function Gestor({name, user}){
    return(
        <section>
            <Header name={name} user={user}></Header>
            <h3>Tela Gestor</h3>
        </section>
    )
}