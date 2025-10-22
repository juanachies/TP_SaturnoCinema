import Contact from "../models/Contact.js";

export const contactMessage = async (req, res) => {
 const {nombre, email, mensaje} = req.body;

    if (!mensaje ||!nombre || !email )
        return res.status(400).send({message: 'This field is required'})

    const newContact = await Contact.create({
        nombre,
        email, 
        mensaje 
    })

    res.status(201).json(newContact);
}