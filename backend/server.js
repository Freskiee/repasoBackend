
const express = require('express')
const colors = require('colors')
const dotevn = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tareas', require('./routes/tareasRoutes')) // estas son las rutas que se usan en postman para probarlas en los get, post, put y delete
app.use('/api/users', require('./routes/usersRoutes')) // estas son las rutas que se usan en postman para probarlas en los get, post, put y delete

app.use(errorHandler) // esto es lo que hace que mande el error ya sea para el cliente o para el programador, tenemos que crear nosotros esa funcion y decirle que es lo que queremos que muestre en cada caso

app.listen(port, () => console.log(`Server started on port: ${port}`)) // esto te muestra el puerto en el que se levanta el server