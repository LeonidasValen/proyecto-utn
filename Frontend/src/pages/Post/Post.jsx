import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import { PostAside } from '../../components/Menu/PostAside';
import { Loading } from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify'; // Extecion para sanitizar el html
import dayjs from 'dayjs';// Extensión para formatear la fecha
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('es');

import './post.css'

export function Post() {

    const { user } = useAuth()
    const { getPost, getPostsAside, deletePost, posts, loading, error } = usePost()

    const { id } = useParams(); // obtiene el id de la url
    const navigate = useNavigate()

    const userOwner = user && user.id === posts.userId?._id; // verifica si el usuario es el propietario del post

    useEffect(() => {
        if (id) {
            getPost(id);
        }
    }, [id]);

    //trae los posts del aside
    useEffect(() => {
        if (posts.cat && posts._id) {
            getPostsAside(posts.cat, posts._id)
        }
    }, [posts.cat, posts._id])

    const handleDeletePost = async (id) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Seguro que quieres borrar este post?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        });
    
        if (result.isConfirmed) {
            try {
                await deletePost(id); 
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: '¡Borrado!',
                    text: 'Post borrado con éxito.',
                    showConfirmButton: false,
                    timer: 1200,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo borrar el post. Intenta de nuevo.',
                });
            }
        }
    }

    if (loading) {
        return <Loading />;
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
        <main className="single">
            {posts ? (
                <>
                    <div className="content">
                        <img src={`${posts.img}`} alt="" />
                        <div className='user'>
                            {posts.userId?.profilePicture
                                ? (<img src={posts.userId?.profilePicture} alt="" />)
                                : (<img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png" alt="" />)
                            }
                            <div className="info">
                                <span>{posts.userId?.username}</span>
                                <p>Públicado {dayjs(posts.createdAt).fromNow()} </p>
                            </div>

                            {userOwner && (
                                <div className="edit">
                                    <Link to={`/write?edit=${posts._id}`} state={posts}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" />
                                        </svg>
                                    </Link>
                                    <button onClick={() => handleDeletePost(posts._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
                                </div>
                            )
                            }

                        </div>
                        <h1>{posts.title}</h1>
                        <div className='descrip' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(posts.descrip) }}>
                        </div>
                    </div>
                    <PostAside />
                </>
            ) : <h1>No hay ningun post</h1>}
        </main>
    )
}