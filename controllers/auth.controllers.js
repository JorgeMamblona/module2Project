const User = require("../models/User.model")
const Team = require("../models/Team.model")

const bcrypt = require("bcryptjs")
const saltRounds = 10

//REGISTER
const registerRender = (req, res, next) => {
    res.render("auth/register")
}

const registerHandler = (req, res, next) => {

    const { username, email, password: plainPassword } = req.body
    let { avatar } = req.body

    if (!avatar) avatar = "https://res.cloudinary.com/dn31sgzg7/image/upload/v1700208802/default_profile_ohxzpj.jpg"

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
}

//LOGIN
const loginRender = (req, res, next) => {
    res.render("auth/login")
}

const loginHandler = (req, res, next) => {

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
}

//LOGOUT
const logoutHandler = (req, res, next) => {
    req.session.destroy(() => res.redirect("/"))
}


module.exports = {
    registerRender,
    registerHandler,
    loginRender,
    loginHandler,
    logoutHandler
}