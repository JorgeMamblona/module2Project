const express = require('express')
const Gym = require('../models/Gym.model')
const User = require('../models/User.model')
const { checkRole } = require('../middleware/route-guard')
const router = express.Router()

router.get("/gym-map", (req, res, next) => {
    res.render('gym/map')
})


router.get("/create", checkRole("Leader", "Admin"), (req, res, next) => {
    res.render("gym/create")
})


router.post("/create", checkRole("Leader", "Admin"), (req, res, next) => {

    const { name, description, latitude, longitude } = req.body
    const { _id: owner_id } = req.session.currentUser
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    User
        .findById(owner_id)
        .then(ownerData => {
            const { _id: owner } = ownerData
            return Gym.create({ name, description, owner, location })
        })
        .then(() => res.redirect("/gym/gym-map"))
        .catch(err => next(err))






})

module.exports = router
