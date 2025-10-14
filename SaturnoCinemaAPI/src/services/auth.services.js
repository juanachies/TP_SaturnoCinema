import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateLoginUser, validateRegisterUser } from "../helpers/validations.js"


export const loginUser = async (req, res) => {
    const result = validateLoginUser(req.body)

    if(result.error) {
        return res.status(400).send({message: result.message})
    }

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user)
        return res.status(401).send({message: 'Usuario no existente'})

    const comparison = await bcrypt.compare(password, user.password)

    if (!comparison)
        return res.status(401).send({message: 'Email y/o contraseña incorrecta'})

    const secretKey = 'movies';

    const token = jwt.sign({email}, secretKey, {expiresIn: '1h'});

    return res.status(200).json({token})
}


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


export const findUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users)
}


export const updateUser = async (req, res) => {
    const {id} = req.params;
    const { name, surname, email, birthdate, telephone, password, type } = req.body;

    const user = await User.findByPk(id);

    if (!user) 
        return res.status(404).send({message: 'User not found'})

    await user.update({
        name, 
        surname, 
        email, 
        birthdate, 
        telephone, 
        password, 
        type
    })

    await user.save();

    res.json(user)
}


export const deleteUser = async(req, res) => {
    const {id} = req.params;
    const user = await User.findByPk(id);

    if (!user)
        return res.status(404).send({message: 'User not found'})

    await user.destroy()

    res.send(`User with id: ${id} deleted`)
}