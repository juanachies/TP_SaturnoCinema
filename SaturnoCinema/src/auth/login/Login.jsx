import AuthContainer from "../authContainer/AuthContainer"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  return (
    <AuthContainer>
      <div className="auth-container">
        <h2>INGRESA CON TU USUARIO</h2>
        <form action="">
          <div className="auth-inputs">
            <label>Email:</label>
            <input 
              type="email"
              placeholder="email@ejemplo.com"
            /> 
          </div>
          <div className="auth-inputs">
            <label>Contraseña:</label>
            <input 
              type="password"
              placeholder="Ingresar contraseña..."
            /> 
          </div>
          <button>Ingresar</button>
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
