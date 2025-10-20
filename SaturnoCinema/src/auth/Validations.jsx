
export const validateString = (str) => {
    const strRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    return strRegex.test(str)
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

export const validateTelephone = (tel) => {
    const telRegex = /^\d{7,15}$/
    return telRegex.test(tel)
}

export const validatePassword = (password, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && password.length < minLength)
        return false;

    if (maxLength && password.length > maxLength)
        return false;

    if (needsUppercase && !/[A-Z]/.test(password))
        return false;

    if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}

export const ValidateRegister = (formData) => {
    const errors = {}
    
    if (!formData.name.trim()){
        errors.name = 'El nombre es obligatorio'
    } else if (!validateString(formData.name)){
        errors.name = "Solo se permiten letras";
    }

    if (!formData.surname.trim()){
        errors.surname = 'El apellido es obligatorio'
    } else if (!validateString(formData.surname)){
        errors.surname = "Solo se permiten letras";
    }

    if (!formData.email.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
        errors.email = "El email no es válido";
    }

    if (!validateTelephone(formData.telephone)) {
        errors.telephone = "El teléfono solo debe contener entre 7 y 15 números";
    }

    const backendPasswordValid = validatePassword(formData.password, 7, null, true, true); 

    if (!formData.password.trim()) {
        errors.password = "La contraseña es obligatoria";
    } else if (!backendPasswordValid) {
        errors.password = "Mínimo 7 caracteres, incluyendo mayúscula y número"; // Mensaje unificado
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


export const ValidateLogin = (formData) => {
    const errors = {};
    
    if (!formData.email.trim()) {
        errors.email = "El email es obligatorio";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Mail invalido"; 
    }

    const backendPasswordValid = validatePassword(formData.password, 7, null, true, true); 

    if (!formData.password.trim()) {
        errors.password = "La contraseña es obligatoria";
    } else if (!backendPasswordValid) {
        errors.password = "Contraseña inválida"; 
    }
    
    return errors;
}

export const ValidateContact = (formData) => {
    const errors = {};
    
        if (!formData.nombre.trim()){
        errors.nombre = 'El nombre y apellido es obligatorio';
        } else if (!validateString(formData.nombre)){
        errors.nombre = "Solo se permiten letras";
        }

        if (!formData.email.trim()) {
            errors.email = "El email es obligatorio";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Email invalido"; 
        }
    
        if (!formData.mensaje.trim()){
        errors.mensaje = 'Este campo es obligatorio';
        }
    return errors;
    
}