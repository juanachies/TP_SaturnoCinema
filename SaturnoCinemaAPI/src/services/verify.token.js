import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const header = req.header('Authorization') || '';
    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No posee autorizacion requerida" });
    }
    
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log(payload);
        next();
    } catch (error) {
        return res.status(403).json({ message: "No posee permisos correctos" });
    }
}
