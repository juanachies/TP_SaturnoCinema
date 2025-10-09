import User from '../models/User.js'
import bcrypt from 'bcrypt';
import { validateRegisterUser } from '../helpers/validations.js';

export const registerUser = async (req, res) => {
    const validation = validateRegisterUser(req.body);
    if (validation.error) {
        return res.status(400).json({ message: validation.message });
    }

    const { name, surname, email, telephone, birthdate, password } = req.body;

    const user = await User.findOne({
        where: {
            email,
        }
    });

    if (user) return res.status(400).send({message: 'Usuario existente'});

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name, 
        surname, 
        email, 
        telephone, 
        birthdate,
        password: hashedPassword
    });

    res.json(newUser.id);
}