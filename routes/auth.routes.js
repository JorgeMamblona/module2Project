const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")
const router = express.Router()
const saltRounds = 10

//routes

router.get("/register", (req, res, next) => {
    res.render("auth/register")
})

router.post("/register", (req, res, next) => {

    const { username, email, password: plainPassword } = req.body
    let { avatar } = req.body
    if (!avatar) avatar = "https://i.stack.imgur.com/l60Hf.png"

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => {
            console.log("creating user:", { username, email, password: hashedPassword, avatar })
            User.create({ username, email, password: hashedPassword, avatar })
        })
        .then(() => res.redirect("/"))
        .catch(error => next(error))
})

router.get("/login", (req, res, next) => {
    res.render("auth/login")
})

router.post("/login", (req, res, next) => {

    const { email, password: plainPassword } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render("auth/login", { errorMessage: "Email not registered" })
                return
            } else if (bcrypt.compareSync(plainPassword, user.password) === false) {
                res.render("auth/login", { errorMessage: "Incorrect password" })
                return
            } else {
                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(error))
})

module.exports = router