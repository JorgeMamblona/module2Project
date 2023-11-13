const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get("/", isLoggedIn, (req, res, next) => {
    console.log("-----------------------------------")

    User
        .find({ role: { $ne: "Admin" } })
        .then(trainers => res.render("trainers/list", { trainers }))
        .catch(err => next(err))

})

module.exports = router