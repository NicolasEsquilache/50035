import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'


const fileStorage = FileStore(session)

const app = express()
const PORT = 8080

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/sesiones?retryWrites=true&w=majority&appName=Cluster0",
        /*  mongoOptions: {
             useNewUrlParser: true,
             useUnifiedTopology: true
 
         }, */
        ttl: 15

    }),
    secret: "1234562024",
    resave: false,
    saveUninitialized: false
}))

app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== "coder" || password !== "house") {
        return res.send('inicio de sesion invalido')
    }

    req.session.user = username
    req.session.admin = true
    res.send('Inicio de sesion exitoso')
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})