const express = require('express')
const Gym = require('../models/Gym.model')
const User = require('../models/User.model')
const router = express.Router()

router.get("/gym-map", (req, res, next) => {

    res.render('gym/map')

})


router.get("/create", (req, res, next) => {

    res.render("gym/create")

})

router.post("/create", (req, res, next) => {

    const { name, description, latitude, longitude } = req.body
    const owner_id = req.session.currentUser._id
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    User
        .findById(owner_id)
        .then(ownerData => {
            const owner = ownerData._id
            return Gym.create({ name, description, owner, location })
        })
        .then(() => res.redirect("/gym/gym-map"))
        .catch(err => next(err))

})

module.exports = router
