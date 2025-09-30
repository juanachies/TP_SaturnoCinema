export const ValidateRegister = (formData) => {
    const errors = {}

    if (!formData.name.trim()){
        errors.name = 'El nombre es obligatorio'
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.name)){
        errors.name = "Solo se permiten letras";
    }

    if (!formData.surname.trim()){
        errors.surname = 'El apellido es obligatorio'
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.name)){
        errors.surname = "Solo se permiten letras";
    }

    if (!formData.email.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "El email no es válido";
    }

    if (!/^\d{7,15}$/.test(formData.telephone)) {
        errors.telephone = "El teléfono solo debe contener entre 7 y 15 números";
    }

    if (!formData.password.trim()) {
        errors.password = "La contraseña es obligatoria";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
        errors.password = "Mínimo 8 caracteres, incluyendo letras y números";
    }

    if (!formData.confPassword.trim()) {
        errors.confPassword = "Confirmar la contraseña es obligatorio";
    } else if (formData.password !== formData.confPassword) {
        errors.confPassword = "Las contraseñas no coinciden";
    }

    if (!formData.terminos) {
        errors.terminos = "Debes aceptar los términos y condiciones"
    }

    return errors;
}


export const ValidateLogin = () => {

}