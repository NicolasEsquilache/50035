import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()
const PORT = 8080


app.get('/', (req, res) => {
    res.send("Bienvenido")
})

app.get('/set-cookie', (req, res) => {
    res.cookie('miCookie', 'valorCookie', { maxAge: 10000, httpOnly: true })
    res.send('cookie establecida')
})


app.get('/get-cookie', (req, res) => {
    const miCookie = req.cookies.miCookie
    if (miCookie) {
        res.send(`El valor de la cookie es ${miCookie}`)
    } else {
        res.send('No se encontraron cookies almacenadas')
    }
    console.log(miCookie)
})


app.get('/clear-cookie', (req, res) => {
    res.clearCookie('miCookie')
    res.send('Cookie eliminada')
})

const firmaSecreta = 'miClaveSecreta'
app.use(cookieParser(firmaSecreta))

app.get('/set-signed-cookie', (req, res) => {
    res.cookie('miCookieFirmada', 'valorCookieFirmada', { signed: true })
    res.send('Cookie firmada establecida')
})

app.get('/get-signed-cookie', (req, res) => {
    const miCookieFirmada = req.signedCookies.miCookieFirmada
    if (miCookieFirmada) {
        res.send(`El valor de la Cookie firmada es ${miCookieFirmada}`)
    } else {
        res.send('No se establecieron cookies firmadas')
    }
})

app.get('/clear-signed-cookie', (req, res) => {
    res.clearCookie('miCookieFirmada')
    res.send('Cookie eliminada')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})