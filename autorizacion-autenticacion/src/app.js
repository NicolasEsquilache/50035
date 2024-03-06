const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const usersRouter = require('./routes/users.router.js');
const cookieParser = require('cookie-parser');

const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/auth?retryWrites=true&w=majority');

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://omanias:1234562023@cluster0.3lmci0d.mongodb.net/auth?retryWrites=true&w=majority',
        ttl: 600,
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false
}));


app.use(cookieParser())
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/api/sessions', usersRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})