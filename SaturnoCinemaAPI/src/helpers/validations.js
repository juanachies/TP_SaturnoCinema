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

    else if (maxLength && password.length > maxLength)
        return false;

    else if (needsUppercase && !/[A-Z]/.test(password))
        return false;

    else if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}


export const validateRegisterUser = (body) => {
    const { name, surname, email, telephone, password } = body;

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