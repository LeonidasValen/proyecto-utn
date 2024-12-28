import './footer.css'

export function Footer() {
    return (
        <footer>
            <section className="content">
                <div className="footer-logo">
                    <div><img src='/./img/logo.png' alt="logo" /></div>
                    <span>Echo por los alumnos del curso de Desarrollo Web del CUDI</span>
                </div>
                <div className="footer-links">
                    <div className="colums">
                        <h1>Product</h1>
                        <ul>
                            <li>Why Perspective</li>
                            <li>Features</li>
                            <li>Team</li>
                            <li>Login</li>
                        </ul>
                    </div>
                    <div className="colums">
                        <h1>Company</h1>
                        <ul>
                            <li>About us</li>
                            <li>Contact us</li>
                            <li>Careers</li>
                            <li>Sponsors</li>
                        </ul>
                    </div>
                    <div className="colums">
                        <h1>Legal</h1>
                        <ul>
                            <li>Cookie Policies</li>
                            <li>Privacy policy</li>
                            <li>Terms of service</li>
                        </ul>
                    </div>

                </div>
            </section>
            <div className="copy">
                <span>© Copyright 2024 - Licence</span>
                <ul className="links">
                    <li>
                        <a href="https://github.com/palomabgz/proyectoback-dpmt" aria-label='link github' target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                            </svg>
                        </a>
                    </li>
                    <li></li>
                </ul>
            </div>
        </footer>
    )
}