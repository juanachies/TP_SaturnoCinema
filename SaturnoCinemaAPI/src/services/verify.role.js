export const verifyRole = (allowedTypes) => {
    return (req, res, next) => {
        const { type } = req.user;

        if (!allowedTypes.includes(type))
            return res.status(403).json({ message: "No tiene permisos suficientes" });

        next();
    };
};