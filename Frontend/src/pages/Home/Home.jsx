import { Posts } from '../../components/Posts/Posts'
import './home.css'

export function Home() {
    return (
        <main className="home">
            <section className="banner">
                <div className="content">
                    <h1>¡Bienvenido al blog de Noticias!</h1>
                    <p>Blog de noticias desarrollado con React y Node.js. En este espacio, podrás compartir tus opiniones y noticias sobre una variedad de temas.</p>
                </div>
            </section>
            <Posts/>
        </main>
    )
}
