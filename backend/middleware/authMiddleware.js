const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // obtenemos el token del encabezado
            token = req.headers.authorization.split(' ')[1]

            // verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // obtener los datos del usuario con el id del payload del token
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Acceso no autorizado, el token no es válido')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporcionó ningun token')

    }

})


module.exports = { protect }