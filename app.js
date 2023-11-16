require("dotenv").config()

require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require("./config/session.config")(app)
require("./middleware/route-guard")

app.locals.appTitle = `POKEMON`

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser
    if (app.locals.loggedUser) {
        app.locals.isLeader = req.session.currentUser.role === 'Leader'
    } else {
        app.locals.isLeader = false
    }
    next()
})

require("./routes")(app)
require("./error-handling")(app)

module.exports = app