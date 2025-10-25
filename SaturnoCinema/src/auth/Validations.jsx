
export const validateString = (str) => {
    const strRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    return strRegex.test(str)
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

export const validateDate = (date) => {
    const d = new Date(date);
    if (!(d instanceof Date) || isNaN(d)) return false;

    const today = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);

    return d <= today && d >= hundredYearsAgo;
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

    if (!validateDate(formData.birthdate)) {
        errors.birthdate = "La fecha de nacimiento debe ser válida";
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


export const validateMovie = (movieData) => {
  const errors = {};

  if (!movieData.title?.trim()) {
    errors.title = "El título es obligatorio";
  }
  if (!movieData.director?.trim()) {
    errors.director = "El director es obligatorio";
  }
  if (!movieData.year || movieData.year < 1800) {
    errors.year = "Año inválido";
  }
  if (!movieData.genre?.trim()) {
    errors.genre = "El género es obligatorio";
  }
  if (!movieData.runtime || movieData.runtime <= 0) {
    errors.runtime = "Duración inválida";
  }
  const rating = parseInt(movieData.rating, 10);
  if (isNaN(rating) || rating < 0 || rating > 5) {
    errors.rating = "Rating debe estar entre 0 y 5";
  }
  if (!Array.isArray(movieData.hours) || movieData.hours.length === 0 || movieData.hours.some(h => !h.trim())) {
    errors.hours = "Debes agregar al menos un horario válido";
  }
  if (!movieData.plot?.trim()) {
    errors.plot = "La sinopsis es obligatoria";
  }
  if (!movieData.imageUrl?.trim()) {
    errors.imageUrl = "La URL de la imagen es obligatoria";
  }

  return errors;
};
