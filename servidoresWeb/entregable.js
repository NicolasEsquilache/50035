import express, { urlencoded } from "express"
import { url } from "inspector"
const app = express()
const PORT = 8080


/* app.get("/bienvenida", (req, res) => {
    const htmlResponse = `<p style="color:blue;">Bienvenido!</p>`
    res.send(htmlResponse)
})
app.get("/usuario", (req, res) => {
    const user = {
        nombre: "Rodrigo",
        apellido: "Cortes",
        edad: 25,
        correo: "rodrigo@mail.com"
    }
    res.json(user)
}) */

/* app.get("/unparametro/:nombre/:apellido", (req, res) => {
    // console.log(req.params.nombre)
    res.send(`Bienvenid@ ${req.params.nombre} ${req.params.apellido}`)
}) */

app.use(urlencoded({ extended: true }))


const products = [
    {
        id: "1",
        nombre: "Escuadra",
        precio: 123.45
    },
    {
        id: "2",
        nombre: "Calculadora",
        precio: 234.56
    },
    {
        id: "3",
        nombre: "Globo Terráqueo",
        precio: 345.67
    },
    {
        id: "4",
        nombre: "Paleta Pintura",
        precio: 456.78
    },
    {
        id: "5",
        nombre: "Reloj",
        precio: 567.89
    },
    {
        id: "6",
        nombre: "Agenda",
        precio: 678.90
    }
]


app.get("/products", (req, res) => {
    let limit = parseInt(req.query.limit); // Obtener el valor del parámetro limit
    let limitedProducts = [...products]; // Copiar la lista de productos original

    if (!isNaN(limit) && limit > 0) {
        limitedProducts = limitedProducts.slice(0, limit); // Limitar la lista de productos según el parámetro limit
    }

    res.json(limitedProducts);
});

app.get("/products/:idProduct", (req, res) => {
    let idProduct = req.params.idProduct

    let product = products.find(p => p.id === idProduct)

    if (!product) return res.send({ error: "No se encuentra el producto" })

    res.send({ product })
})

app.listen(PORT, () => {
    console.log(`Server escuchando en ${PORT}`)
})