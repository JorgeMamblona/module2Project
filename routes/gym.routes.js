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

router.get("/edit/:gym_id", checkRole("Leader", "Admin"), (req, res, next) => {

    const { gym_id } = req.params

    Gym
        .findById(gym_id)
        .then(gym => res.render("gym/edit", gym))
        .catch(err => next(err))
})

router.post("/edit/:gym_id", checkRole("Leader", "Admin"), (req, res, next) => {

    const { gym_id } = req.params
    const { name, description, latitude, longitude } = req.body
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Gym
        .findByIdAndUpdate(gym_id, { name, description, location })
        .then(() => res.redirect(`/gym/details/${gym_id}`))
        .catch(err => next(err))
})

router.post("/delete/:gym_id", checkRole("Leader", "Admin"), (req, res, next) => {

    const { gym_id } = req.params

    Gym
        .findByIdAndDelete(gym_id)
        .then(() => res.redirect("/gym/gym-map"))
        .catch(err => next(err))
})

router.get("/details/:gym_id", checkRole("Leader", "Admin"), (req, res, next) => {

    const { gym_id } = req.params

    Gym
        .findById(gym_id)
        .then(gym => res.render("gym/details", gym))
        .catch(err => next(err))
})

module.exports = router
