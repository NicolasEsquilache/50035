// sessions.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const { createHash, isValidatePassword } = require('../../../utils.js');


router.get("/login", async (req, res) => {
    res.render("login.handlebars")
})

router.get("/register", async (req, res) => {
    res.render("register.handlebars")
})

router.get("/profile", async (req, res) => {
    /*  if (!req.session.user) {
         return res.redirect("login")
     } */

    const { first_name, last_name, email, age } = req.session.user

    res.render("profile", { first_name, last_name, age, email })
})


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send({ status: "error", error: "Faltan datos" });
    }
    /*  const user = await User.findOne({ email: email });
     if (user) {
         return res.status(400).send({ status: "error", error: "El usuario ya existe" });
     } */
    const user = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    });

    console.log(user)

    res.send({ status: "ok", message: "Usuario creado", payload: user });
    await user.save()
    // res.redirect('/login');
});


router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Valores incorrectos" });
    }
    const user = await User.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1 })

    console.log(user)

    if (!user) {
        return res.status(400).send({ status: "error", error: "Usuario no encontrado" });
    }
    if (!isValidatePassword(user, password)) {
        return res.status(403).send({ status: "error", error: "Contraseña incorrecta" });
    }
    req.session.user = user;

    res.send({ status: "ok", message: "Usuario logueado", payload: user });

    res.redirect('/profile');

});


router.get("/logout", async (req, res) => {
    delete req.session.user
    res.redirect("login")
})

router.get('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Valores incorrectos" });
    }
    const user = User.findOne({ email: email }, { email: 1, first_name: 1, last_name: 1, password: 1 });
    console.log(user)
    if (!user) {
        return res.status(400).send({ status: "error", error: "Usuario no encontrado" });
    }
    if (!isValidatePassword(user, password)) {
        return res.status(403).send({ status: "error", error: "Contraseña incorrecta" });
    }
    req.session.user = user;

    res.send({ status: "ok", message: "Usuario logueado", payload: user });
    /*
   const isAdmin = user.email === admin
   if (isAdmin) {
       req.session.admin = true
       res.redirect('/privado')
   } else {
       req.session.admin = false;
   } */
    res.redirect('/profile');
});


module.exports = router;