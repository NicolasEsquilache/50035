import express from "express"
import cors from "cors"
const app = express()
const PORT = 8080
//middlewares

app.use(cors())

//Endpoint
app.get('/bienvenida', (req, res) => {
    const htmlRespuesta = '<p style="color: blue">Bienvenido!</p>'
    res.send(htmlRespuesta)
})


app.get('/usuarios', (req, res) => {
    const usuario = {
        nombre: "Coder",
        apellido: "House",
        email: "coder@house.com"
    }
    res.json(usuario)
})


app.get("/parametro/:id", (req, res) => {
    console.log(req.params.id)
    res.send(`Bienvenido usuario ${req.params.id}`)
})

const usuarios = [
    { id: 1, nombre: "A", apellido: "apellido A" },
    { id: 2, nombre: "B", apellido: "apellido B" },
    { id: 3, nombre: "C", apellido: "apellido C" }
]

app.get("/", (req, res) => {
    res.send(usuarios)
})

app.get("/:userId", (req, res) => {
    const idUsuario = req.params.userId
    let usuario = usuarios.find((u) => u.id == idUsuario)
    if (!usuario) return res.send({ error: "Usuario no encontrado" })
    res.send(usuario)

})

app.get("/products", (req, res) => {
    let limite = parseInt(req.query.limite) // obtengo el limite de consultas
    let productosLimitados = [...products]

    if (!isNaN(limite) && limite > 0) {
        limitedProducts = productosLimitados.slice(0, limite) // limitar la cantidad de productos
    }

    res.json(limitedProducts)
})

app.listen(PORT, () => console.log(`Servidor con express en el puerto ${PORT}`))