import './authContainer.css'

const AuthContainer = ({children}) => {
    return (
        <div className="auth">
            <h1 className='auth-title'>ÚNETE A SATURNO CINEMA</h1>
            {children}
        </div>
        
    )
}

export default AuthContainer