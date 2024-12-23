import { Link } from 'react-router-dom';
import { usePost } from '../../context/PostContext'
import './postAside.css'

export function PostAside() {

  const { loading, postsAside } = usePost()

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <aside className="menu">
      <h1>Otros posts que te pueden interesar:</h1>
      {postsAside.length > 0 ? (
        postsAside.map((post) => (
          <div className="post" key={post._id}>
            <Link to={`/detailPost/${post._id}`} onClick={() => handleLinkClick(post._id)}>
              <img src={`${post.img}`} alt="" />
              <h2>{post.title}</h2>
              <span> Leer más</span>
            </Link>
          </div>
        ))
      ) : (
        <p>No hay contenido relacionado</p>
      )}
    </aside>
  );
}
