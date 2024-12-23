import { useEffect } from "react"
import { usePost } from "../../context/PostContext"
import { Link, useLocation } from "react-router-dom"
import { Loading } from "../Loading/Loading";
import DOMPurify from 'dompurify'; // Extecion para sanitizar el html
import dayjs from 'dayjs';// Extensión para formatear la fecha
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('es');
import './posts.css'

export function Posts() {

  const { loading, error, posts, getPosts } = usePost()

  const cat = useLocation().search

  useEffect(() => {
    getPosts(cat)
  }, [cat])

  if (loading) {
    return (
      <section className="posts" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </section>
    );
  }

  if (error.length > 0) {
    return (
        error && (
            <main className="single">
                <h1>{error || 'Error al cargar el post'}</h1>
            </main>
        )
    )
}

  return (
    <section className="posts">
      {posts.length > 0 ? (

        posts.map(post => (
          <article className="post" key={'$post' + post._id}>
            <Link className="link" to={`/detailPost/${post._id}`} >
              <div className="img">
                <img src={`${post.img}`} alt="" />
              </div>
              <div className="content">
                <div>
                  <h1>{post.title}</h1>
                  <p className="date">Publicado {dayjs(post.createdAt).fromNow()}</p>
                </div>
                <div className="descip-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.descrip) }}></div>
              </div>
            </Link>
          </article>
        ))

      ) : (
        <h1>No hay ningun posts</h1>
      )
      }
    </section>
  )
}
