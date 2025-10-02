import { useNavigate } from "react-router-dom"
import AuthContainer from "../authContainer/AuthContainer"
import { useState } from "react"
import { ValidateRegister } from "../Validations"

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        telephone: '',
        password: '',
        confPassword: '',
        terminos: false
    });

    const [errors, setErrors] = useState({})


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const validationErrors = ValidateRegister(formData);
        setErrors(validationErrors)

         if (Object.keys(validationErrors).length === 0) {
            console.log("Formulario válido, enviar al backend:", formData)
        }
    }


    return (
        <AuthContainer>
            <div className="auth-container">
                <h2>CREA UN NUEVO USUARIO</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-row">
                        <div className="auth-inputs">
                            <label>Nombre:</label>
                            <input 
                            type="text"
                            placeholder="Ingresar nombre..."
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            /> 
                            {errors.name && <p className="errors">{errors.name}</p>}
                        </div>
                        <div className="auth-inputs">
                            <label>Apellido:</label>
                            <input 
                            type="text"
                            placeholder="Ingresar apellido..."
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            /> 
                            {errors.surname && <p className="errors">{errors.surname}</p>}
                        </div>
                    </div>

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

                    <div className="auth-row">
                        <div className="auth-inputs">
                            <label>Fecha de nacimiento:</label>
                            <input 
                            type="date"
                            placeholder="dd/mm/aaa"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            /> 
                            {errors.birthdate && <p className="errors">{errors.birthdate}</p>}
                        </div>
                        <div className="auth-inputs">
                            <label>Teléfono:</label>
                            <input 
                            type="number"
                            placeholder="1234567890"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            /> 
                            {errors.telephone && <p className="errors">{errors.telephone}</p>}
                        </div>
                    </div>

                    <div className="auth-row">
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
                        <div className="auth-inputs">
                            <label>Confirmar contraseña:</label>
                            <input 
                            type="password"
                            placeholder="Repetir contraseña..."
                            name="confPassword"
                            value={formData.confPassword}
                            onChange={handleChange}
                            /> 
                            {errors.confPassword && <p className="errors">{errors.confPassword}</p>}
                        </div>
                    </div>

                    <div className="auth-checkbox">
                        <input 
                            type="checkbox" 
                            id="terminos" 
                            name="terminos"
                            checked={formData.terminos}
                            onChange={handleChange}
                        />
                        <label htmlFor="terminos">Acepto términos y condiciones</label>
                        {errors.terminos && <p className="errors">{errors.terminos}</p>}
                    </div>
                    
                    <button type="submit">Registrate</button>
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