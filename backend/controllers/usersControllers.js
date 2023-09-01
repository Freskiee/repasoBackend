const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


const registerUser = asyncHandler(async (req, res) => {
    // desestructuramos el req.body (esto es de postman)
    const { name, email, password } = req.body

    // verificamos que nos pasen todos los datos requeridos
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    // verificar que ese usuario no exista
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    // debemos hacer el hash del password (sal y pimienta)
    const salt = await bcrypt.genSalt(10) // el 10 se le pone porque es el default, depende el numero es las veces que se va a generar el hash aleatorio, y el que este seleccionado es el que se pondra
    const hashedPassword = await bcrypt.hash(password, salt) // aqui ya se le hizo el hash al password que es el parametro que esta dentro junto con el salt

    // crear el user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo guardar el registro')
    }
})


const loginUser = asyncHandler(async (req, res) => {

    // desestructuramos los datos del req.body
    const { email, password } = req.body

    // verificamos que nos pasen todos los datos requeridos
    if (!email || !password) {
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    // buscar que el usuario exista
    const user = await User.findOne({ email })

    // verificar el password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Datos de acceso incorrectos')
    }
})

const getUserData = asyncHandler(async (req, res) => {
    res.json(req.user)

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}

