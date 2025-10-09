import React from 'react'
import "./contactForm.css"

const Contact = () => {
  return (
    <section className='contact'>
      <div className='contact-container'>
        <form action="">
          <h2>ENVIANOS UN MENSAJE</h2>
          <div className="contact-inputs">
              <label>Nombre y apellido</label>
              <input type= "text" placeholder='Ingrese su nombre y apellido' required/>
          </div>
          <div className='contact-inputs'>
            <label>Email</label>
            <input type='email' placeholder='email@ejemplo.com' required />
          </div>
          <div className='contact-inputs'>
              <label>Su mensaje</label>
              <textarea type='text' placeholder='Escriba su mensaje' required></textarea>
          </div>
          <button type='submit'>Enviar </button>
        </form>
      </div>  
    </section>
  )
}
 export default Contact