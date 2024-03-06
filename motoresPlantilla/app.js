import express from 'express';
import path from 'path'
import handlebars from 'express-handlebars'


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const PORT = 8080;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, '/views')))

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', "handlebars")

let users = [
    { nombre: "usuario A", apellido: "apellido usuario A", correo: "usuarioA@mail.com" },
    { nombre: "usuario B", apellido: "apellido usuario B", correo: "usuarioB@mail.com" },
    { nombre: "usuario C", apellido: "apellido usuarioC ", correo: "usuarioC@mail.com" },
    { nombre: "usuario D", apellido: "apellido usuario D", correo: "usuarioD@mail.com" },
    { nombre: "usuario E", apellido: "apellido usuario E", correo: "usuarioE@mail.com" }
]

let food = [
    { nombre: "Hamburguesa", precio: 1000 },
    { nombre: "Lomito", precio: 1500 },
    { nombre: "Pastas", precio: 1800 },
    { nombre: "Pizza", precio: 2000 },
    { nombre: "Empanadas", precio: 2500 }
]


app.get("/", (req, res) => {

    let usuario = {
        nombre: "Coder",
        apellido: "House",
        role: "admin"
    }

    res.render("index", {
        usuario,
        isAdmin: usuario.role === "admin",
        food
    })


})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
