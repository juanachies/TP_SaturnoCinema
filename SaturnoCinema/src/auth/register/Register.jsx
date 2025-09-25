import { useNavigate } from "react-router-dom"
import AuthContainer from "../authContainer/AuthContainer"

const Register = () => {

    const navigate = useNavigate()

    return (
        <AuthContainer>
            <div className="auth-container">
        <h2>CREA UN NUEVO USUARIO</h2>
        <form action="">
            <div className="auth-row">
                <div className="auth-inputs">
                    <label>Nombre:</label>
                    <input 
                    type="text"
                    placeholder="Ingresar nombre..."
                    /> 
                </div>
                <div className="auth-inputs">
                    <label>Apellido:</label>
                    <input 
                    type="text"
                    placeholder="Ingresar apellido..."
                    /> 
                </div>
            </div>

            <div className="auth-inputs">
                <label>Email:</label>
                <input 
                type="email"
                placeholder="email@ejemplo.com"
                /> 
            </div>

            <div className="auth-row">
                <div className="auth-inputs">
                    <label>Fecha de nacimiento:</label>
                    <input 
                    type="date"
                    placeholder="dd/mm/aaa"
                    /> 
                </div>
                <div className="auth-inputs">
                    <label>Teléfono:</label>
                    <input 
                    type="number"
                    placeholder="+54 9 123 456-7890"
                    /> 
                </div>
            </div>

            <div className="auth-row">
                <div className="auth-inputs">
                    <label>Contraseña:</label>
                    <input 
                    type="password"
                    placeholder="Ingresar contraseña..."
                    /> 
                </div>
                <div className="auth-inputs">
                    <label>Confirmar contraseña:</label>
                    <input 
                    type="password"
                    placeholder="Repetir contraseña..."
                    /> 
                </div>
            </div>
            
            <button>Registrate</button>
            <div className="go-register">
                <p>¿Ya tenés cuenta?</p>
                <button onClick={() => navigate('/login')}>Ingresar</button>
            </div>
          
        </form>     
      </div>
        </AuthContainer>
    )
}

export default Register