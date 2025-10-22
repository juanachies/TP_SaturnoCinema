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

export const validateDate = (date) => {
    const d = new Date(date);
    if (!(d instanceof Date) || isNaN(d)) return false;

    const today = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);

    return d <= today && d >= hundredYearsAgo;
}

export const validatePassword = (password, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && password.length < minLength)
        return false;

    else if (maxLength && password.length > maxLength)
        return false;

    else if (needsUppercase && !/[A-Z]/.test(password))
        return false;

    else if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}


export const validateRegisterUser = (body) => {
    const { name, surname, email, birthdate, telephone, password } = body;

    const result = {
        error: false,
        message: "",
    };

    if (!validateString(name)) {
        return {
        error: true,
        message: "Nombre invalido",
        };
    } else if (!validateString(surname)){
        return {
        error: true,
        message: "Apellido invalido",
        };
    } else if (!email || !validateEmail(email)) {
        return {
        error: true,
        message: "Email invalido",
        };
    } else if (!validateDate(birthdate)) {
        return {
        error: true,
        message: 'Fecha de nacimiento invalida'
        }
    } else if (!validateTelephone(telephone)) {
        return {
        error: true,
        message: "Telefono invalido",
        }
    } else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
        error: true,
        message: "Contraseña invalida",
        };
    }

    return result;
};


export const validateLoginUser = (req) => {
    const { email, password } = req

    const result = {
        error: false,
        message: "",
    };

    if (!email || !validateEmail(email))
        return {
            error: true,
            message: 'Mail invalido'
        }

    else if (!password || !validatePassword(password, 7, null, true, true)){
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}

export const ValidateContact = (req) => {
    const {nombre, email, mensaje} = req

    const result = {
        error: false,
        message: "",
    };

    if (!validateString(nombre) )
        return {
        error: true,
        message: 'Campo invalido'
        }
    else if (!validateEmail(email))
        return{
            error: true,
            message: 'Mail invalido'
        }
    
    else if (!validateString(mensaje))
        return {
        error: true,
        message: 'Mensaje invalido'
        }
    return result;
}

export const ValidateNewMovie = (req) => {
    const {nombre, email, mensaje} = req

    const result = {
        error: false,
        message: "",
    };

    if (!validateString(nombre) )
        return {
        error: true,
        message: 'Campo invalido'
        }
    else if (!validateEmail(email))
        return{
            error: true,
            message: 'Mail invalido'
        }
    
    else if (!validateString(mensaje))
        return {
        error: true,
        message: 'Mensaje invalido'
        }
    return result;
}