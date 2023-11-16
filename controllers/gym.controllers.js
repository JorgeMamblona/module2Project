const Gym = require('../models/Gym.model')
const User = require('../models/User.model')

//GYM MAP
const gymMapRender = (req, res, next) => {
    res.render('gym/map')
}

//CREATE GYM
const gymCreateRender = (req, res, next) => {
    res.render("gym/create")
}

const gymCreateHandler = (req, res, next) => {

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
}

//EDIT GYM
const gymEditRender = (req, res, next) => {

    const { gym_id } = req.params

    Gym
        .findById(gym_id)
        .then(gym => res.render("gym/edit", gym))
        .catch(err => next(err))
}

const gymEditHandler = (req, res, next) => {

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
}

//DELETE GYM
const gymDeleteHandler = (req, res, next) => {

    const { gym_id } = req.params

    Gym
        .findByIdAndDelete(gym_id)
        .then(() => res.redirect("/gym/gym-map"))
        .catch(err => next(err))
}

//SHOW GYM DETAILS
const gymDetailsRender = (req, res, next) => {

    const { gym_id } = req.params
    const { _id: sessionOwner } = req.session.currentUser
    let isOwner = false

    Gym
        .findById(gym_id)
        .then(gym => {
            if (gym.owner.toString() === sessionOwner) {
                isOwner = true
            }
            res.render("gym/details", { gym, isOwner })
        })
        .catch(err => next(err))
}

module.exports = {
    gymMapRender,
    gymCreateRender,
    gymCreateHandler,
    gymEditRender,
    gymEditHandler,
    gymDeleteHandler,
    gymDetailsRender
}