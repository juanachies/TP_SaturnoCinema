import React from 'react'
import "./contactForm.css"
import { useState } from "react"
import { ValidateContact } from '../../auth/Validations';

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Contact = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = ValidateContact(formData)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {

      fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(errorData => {
              throw new Error(errorData.message || 'Hubo un error');
            });
          }
          return res.json();
        })
        .then(() => {
          alert('Mensaje enviado');
        })
        .catch((err) => {
          console.log(err);
          setErrors(prevErrors => ({
            ...prevErrors,
            api: err.message,
          }));
        });
    }
  }

  return (
    <section className='contact'>
      <div className='contact-container'>
        <form onSubmit={handleSubmit}>
          <h2>ENVIANOS UN MENSAJE</h2>
          <div className="contact-inputs">
            <label>Nombre y apellido</label>
            <input
              type="text"
              placeholder='Ingrese su nombre y apellido'
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required />
            {errors.nombre && <p className="errors">{errors.nombre}</p>}
          </div>
          <div className='contact-inputs'>
            <label>Email</label>
            <input
              type='email'
              placeholder='email@ejemplo.com'
              name="email"
              value={formData.email}
              onChange={handleChange}
              required />
            {errors.email && <p className="errors">{errors.email}</p>}
          </div>
          <div className='contact-inputs'>
            <label>Su mensaje</label>
            <textarea
              type='text'
              placeholder='Escriba su mensaje'
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required></textarea>
            {errors.mensaje && <p className="errors">{errors.mensaje}</p>}
          </div>
          {errors.api && <p className="errors">{errors.api}</p>}
          <button type='submit'>Enviar </button>
        </form>
      </div>
    </section>
  )
}
export default Contact