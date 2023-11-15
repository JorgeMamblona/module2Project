const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const Team = require('../models/Team.model')
const { isLoggedIn } = require('../middleware/route-guard')

router.get("/my-team/add/:pokemon_name", isLoggedIn, (req, res, next) => {
    const { pokemon_name } = req.params
    const owner = req.session.currentUser._id
    Team
        .findOneAndUpdate({ owner }, { $push: { pokemon: pokemon_name } })
        .then(() => res.redirect("/"))
        .catch(err => next(err))

})



router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: { $ne: "Admin" } })
        .then(trainers => res.render("trainers/list", { trainers }))
        .catch(err => next(err))

})

router.get("/my-team", isLoggedIn, (req, res, next) => {

    res.render("trainers/team")
})

module.exports = router