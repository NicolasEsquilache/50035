const express = require('express');
const { generateToken, authToken } = require('./utils');
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = []

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    const exists = users.find(user => user.email === email)
    if (exists) {
        res.sendStatus(409)
        console.log('User already exists')
    } else {
        const user = {
            name,
            email,
            password
        }
        users.push(user)
        const access_token = generateToken(user)
        res.send({ status: "success", access_token })
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(user => user.email === email)
    if (user && user.password === password) {
        const access_token = generateToken(user)
        res.send({ status: "success", access_token })
    } else {
        res.sendStatus(401)
    }
})


app.listen(8080, () => {
    console.log('Server running on port 8080')
})
