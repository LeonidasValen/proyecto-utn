import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { IconCam } from "../../assets/Icons";
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";
import './write.css'
import Swal from "sweetalert2";

const categorias = ['art', 'videogames', 'tecnologies', 'cinema', 'food'];

// Configuracion de Quill
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ 'color': [] }],
    ['link'],
  ],
};

const formats = [
  'header', 'font', 'list', 'bold', 'italic', 'underline', 'align', 'color', 'link'
];

export function Write() {

  const { loading, isAuthenticated, user } = useAuth();
  const { addPost, updatePost } = usePost();

  const navigate = useNavigate();
  const location = useLocation().state;//trae los datos del post para editarlo

  // Redirecciona al usuario no esta autenticado
  useEffect(() => {
    const storedUsername = localStorage.getItem('session_username');
    if (!storedUsername) {
      navigate('/');
    } else if (!loading && (!isAuthenticated || !user)) {
      navigate('/');
    }
  }, [loading, isAuthenticated, user, navigate]);

  //Formulario
  const [errors, setErrors] = useState({});
  const [errorBackEnd, setErrorBackEnd] = useState({})

  const [formData, setFormData] = useState({
    title: location ? location.title : '',
    cat: location ? location.cat : '',
    descrip: location ? location.descrip : '',
    file: location?.img ? location.img : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando el usuario comienza a escribir
  }

  // Maneja los cambios en el la descripcion
  const handleDescripChange = (value) => {
    setFormData({ ...formData, descrip: value });
    setErrors({ ...errors, descrip: '' });
  };

  // Maneja los cambios en el la foto
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, file: selectedFile, });
    setErrors({ ...errors, file: '' });
  };

  //Envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    //Validacion de campos
    if (!formData.title) errors.title = 'El título es obligatorio';
    if (!formData.descrip) errors.descrip = 'La descripción es obligatoria';
    //verifica si hay una imagen nueva o una imagen previa
    if (!formData.file && !location?.img) {
      errors.file = 'Debes subir una foto de portada';
    } else if (formData.file && formData.file instanceof File) {
      // si hay una imagen nueva, validamos el tipo de archivo
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.file.type)) {
        errors.file = 'Debes agregar una foto válida (JPEG, PNG, JPG)';
      }
    }

    if (!formData.cat) {
      errors.cat = 'Debe seleccionar una categoría';
    } else if (!categorias.includes(formData.cat)) {
      errors.cat = 'La categoría seleccionada no es válida';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formSend = new FormData();
    formSend.append("title", formData.title);
    formSend.append("descrip", formData.descrip);
    formSend.append("cat", formData.cat);
    if (formData.file) {
      formSend.append("file", formData.file);
    }

    try {
      Swal.fire({
        title: 'Cargando...',
        text: 'Subiendo el artículo, por favor espere.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (location) {
        const postid = location._id
        await updatePost(formSend, postid);
      } else {
        await addPost(formSend);
      }

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El artículo se ha subido correctamente.',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      Swal.close();
      if (Array.isArray(error)) {
        setErrorBackEnd({ general: '', backendErrors: error });
      } else {
        setErrorBackEnd({ general: error || "Subir el artículo, por favor inténtelo de nuevo" });
      }
    }
  }

  const getPreview = () => {
    // Si hay una imagen en la nube usa la URL
    if (formData.file && typeof formData.file === 'string' && formData.file.startsWith("http")) {
      return formData.file;
    }

    // Si hay un archivo local (seleccionado por el usuario)
    if (formData.file instanceof File) {
      return URL.createObjectURL(formData.file);
    }

    return null; // Si no hay imagen o archivo, no mostramos nada
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <h1>Escribe un artículo</h1>
      <div className="headerForm">
        <div className="photo">
          <IconCam />
          {getPreview() && (
            <img src={getPreview()} alt="Vista previa" />
          )}
          <input type="file" name="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        </div>
        {errors.file && <div className="field-error">{errors.file}</div>}
        <div className="category">
          <label htmlFor="cat">Categoría:</label>
          <select name="cat" value={formData.cat} onChange={handleChange}>
            <option value="">Seleccionar categoría</option>
            {categorias.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.cat && <p className="field-error">{errors.cat}</p>}
        </div>
      </div>
      <div className="content">
        <div className="inputTitle inputRow">
          <label htmlFor="title">Título</label>
          <input type="text" placeholder="Título" name="title" id="title" value={formData.title} onChange={handleChange} />
        </div>
        {errors.title && <p className="field-error">{errors.title}</p>}
        <div className="editorContainer inputRow">
          <label htmlFor="descrip">Descripción</label>
          <ReactQuill
            modules={modules}
            formats={formats}
            className='editor'
            name='descrip'
            id="descrip"
            value={formData.descrip}
            onChange={handleDescripChange}
          />
        </div>
        {errors.descrip && <p className="field-error">{errors.descrip}</p>}
      </div>
      <button className="btnSubmit">Públicar</button>
      {/* Errores generales */}
      {errorBackEnd.general && <p className="field-error">{errorBackEnd.general}</p>}

      {/* Errores del backend (Zod, etc.) */}
      {errorBackEnd.backendErrors && (
        <ul>
          {errorBackEnd.backendErrors.map((err, index) => (
            <li className="field-error" key={index}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  )
}
