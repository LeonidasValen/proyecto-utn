import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconWrite } from "../../assets/Icons";
import './navbar.css'

export function Navbar() {

    const { user, loading, isAuthenticated, logout } = useAuth()

    const navigate = useNavigate()

    // Cierre de sesion
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return (
        <nav className="navbar">
            <header className="container">
                <div className="logo">
                    <Link to={"/"}><img src="/./img/logo.png" alt="logo" /></Link>
                </div>
                <ul className="links">
                    <li><Link className="link" to={"/?cat=art"}>ART</Link></li>
                    <li><Link className="link" to={"/?cat=videogames"}>Videojuegos</Link></li>
                    <li><Link className="link" to={"/?cat=technology"}>Tecnologia</Link></li>
                    <li><Link className="link" to={"/?cat=cinema"}>Cine</Link></li>
                    <li><Link className="link" to={"/?cat=food"}>Comidas</Link></li>
                </ul>
                <ul className="userInfo">
                    {isAuthenticated && user ? (
                        <>
                            <li>
                                {user.profilePicture
                                    ? (<img src={user.profilePicture} alt="userProfile" />)
                                    : (<img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png" alt="userProfile" />)
                                }
                                <span>{user.username}</span>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Cerrar sesion</span>
                            </li>
                            <li className="write">
                                <Link to={"/write"} className="linkFont">Escribir</Link>
                                <Link to={"/write"} className="linkIcon"><IconWrite /></Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="unlogin">
                                <Link className="regislogin" to={"/login"}>Iniciar sesión</Link>
                            </li>
                            <li className="unlogin">
                                <Link className="regislogin" to={"/register"}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </header>
        </nav>
    )
}
