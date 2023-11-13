const express = require('express')
const Gym = require('../models/Gym.model')
const router = express.Router()

router.get("/gym-map", (req, res, next) => {

    res.render('gym/map')
})


router.get("/create", (req, res, next) => {

    res.render("gym/create")
})

router.post("/create", (req, res, next) => {

    const { name, description, latitude, longitude } = req.body
    const { owner } = req.session.currenUser
    res.send(owner)
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Gym
        .create({ name, description, location })
        .then(() => res.redirect("/gym/map"))
        .catch(err => next(err))
})
module.exports = router
