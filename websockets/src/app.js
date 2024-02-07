import express from "express";
import path from 'path'
import handlebars from 'express-handlebars'
import { Server } from "socket.io";

import viewsRouter from './routes/views.router.js'

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

//Endpoint (uri) Identificador de recursos uniforme

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', "handlebars")

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Conexión con socket.io
const socketServer = new Server(httpServer)

app.use("/", viewsRouter)

socketServer.on('connection', socket => {
    console.log("Nueva conexión")
    socket.on('mensaje', data => {
        socket.emit("mensaje", data)
    })
})

