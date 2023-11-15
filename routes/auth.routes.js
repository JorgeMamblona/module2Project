const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")
const Team = require("../models/Team.model")
const router = express.Router()
const saltRounds = 10


router.get("/register", isLoggedOut, (req, res, next) => {
    res.render("auth/register")
})

router.post("/register", isLoggedOut, (req, res, next) => {

    const { username, email, password: plainPassword } = req.body
    let { avatar } = req.body

    if (!avatar) avatar = "https://i.stack.imgur.com/l60Hf.png"

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hashedPassword => {
            return User.create({ username, email, password: hashedPassword, avatar })
        })
        .then((createdUser) => {
            const { _id: owner } = createdUser
            return Team.create({ owner })
        })
        .then(() => res.redirect("/login"))
        .catch(error => next(error))
})

router.get("/login", isLoggedOut, (req, res, next) => {
    res.render("auth/login")
})

router.post("/login", isLoggedOut, (req, res, next) => {

    const { email, password: plainPassword } = req.body

    User
        .findOne({ email })
        .then(user => {
            console.log(req.session)
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

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect("/"))
})

module.exports = router