import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token requerido" });
    }
    
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload // guarda datos del usuario
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
}
