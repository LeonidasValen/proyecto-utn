import { Link } from "react-router-dom"

export function InfoAuth() {
  return (
    <section className="block1">
    <div className="block1-container">
      <Link to={'/'} className="logo"><img src="./img/logo.png" alt="" /></Link>
      <span>
        ¡Bienvenido al sitio de noticias del momento! 📰🎉<br /><br />
        !Registrarte para recibir actualizaciones sobre las noticias más relevantes y participar en nuestra comunidad comentando y compartiendo tus opiniones.
        ¡Gracias por unirte a nosotros!
      </span>
      <div className="img-vector"><img src="./img/write.png" alt="" /></div>
    </div>
  </section>
  )
}
