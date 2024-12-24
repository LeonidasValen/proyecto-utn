import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InfoAuth } from './InfoAuth'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import './auth.css'

export function Register() {

  const { signUp } = useAuth()

  const [errors, setErrors] = useState({})
  const [errorBackEnd, setErrorBackEnd] = useState({})
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando el usuario comienza a escribir
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //validacion de campos
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio'
    } else {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(formData.email)) {
        newErrors.email = 'Ingrese un correo electrónico válido'
      }
    }
    if (!formData.username) newErrors.username = 'El nombre es obligatorio'

    if (!formData.password) newErrors.password = 'El contraseña es obligatorio'

    if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres'

    // Si hay errores, mostrarlos y detener el envio del formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await signUp(formData)
      navigate('/login')
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.close();
      if (Array.isArray(error)) {
        setErrorBackEnd({ general: '', backendErrors: error });
      } else {
        setErrorBackEnd({ general: error || "Error al iniciar sesión, por favor inténtelo de nuevo" });
      }
    }
  }

  return (
    <section className='auth'>

      <InfoAuth />

      <section className="block2">
        <form className='register' onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <label htmlFor="username">Nombre</label>
          <input type="text" placeholder='Nombre'
            name="username"
            onChange={handleChange} />
          {errors.username && <p className="field-error">{errors.username}</p>}
          <label htmlFor="email">Correo</label>
          <input type="text" placeholder='Correo'
            name="email"
            onChange={handleChange} />
          {errors.email && <p className="field-error">{errors.email}</p>}
          <label htmlFor="password">Contraseña</label>
          <input type="password" placeholder='Contraseña'
            name="password"
            onChange={handleChange} />
          {errors.password && <p className="field-error">{errors.password}</p>}
          <button>Registrate</button>
        </form>

        <span className="noaccount">Tenes cuenta? <Link to="/login">Iniciar sesión</Link></span>

        {/* Errores generales del backend*/}
        {errorBackEnd.general && <p className="field-error">{errorBackEnd.general}</p>}

        {/* Errores del backend (Zod, etc.) */}
        {errorBackEnd.backendErrors && (
          <ul>
            {errorBackEnd.backendErrors.map((err, index) => (
              <li className="field-error" key={index}>{err}</li>
            ))}
          </ul>
        )}

      </section>
    </section>
  )
}
