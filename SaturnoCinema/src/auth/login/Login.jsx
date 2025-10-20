import { useState } from "react"
import AuthContainer from "../authContainer/AuthContainer"
import { useNavigate } from "react-router-dom"
import { ValidateLogin } from "../Validations"
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password : ''
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
    const validationErrors = ValidateLogin(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      fetch(`${baseUrl}/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData) 
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(errorData => {
              throw new Error(errorData.message || 'Credenciales incorrectas');
            });
          }
          return res.json();
        })
        .then((data) => { 
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          alert('Login exitoso'); 
          navigate('/');
          window.location.reload(true)
        })
        .catch((err) => {
          console.log(err);
          setErrors(prevErrors => ({
            ...prevErrors,
            api: err.message 
          }));
        });
      }
    }


  return (
    <AuthContainer>
      <div className="auth-container">
        <h2>INGRESA CON TU USUARIO</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-inputs">
            <label>Email:</label>
            <input 
              type="email"
              placeholder="email@ejemplo.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            /> 
            {errors.email && <p className="errors">{errors.email}</p>}
          </div>
          <div className="auth-inputs">
            <label>Contraseña:</label>
            <input 
              type="password"
              placeholder="Ingresar contraseña..."
              name="password"
              value={formData.password}
              onChange={handleChange}
            /> 
            {errors.password && <p className="errors">{errors.password}</p>}
          </div>
          {errors.api && <p className="errors">{errors.api}</p>}
          <button type="submit">Ingresar</button>
          <div className="go-register">
            <p>¿Todavía no tenés cuenta?</p>
            <button onClick={() => navigate('/register')}>Registrate</button>
          </div>
          
        </form>     
      </div>
    </AuthContainer>
  )
}

export default Login
