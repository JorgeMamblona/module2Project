const express = require('express')
const router = express.Router()

const Gym = require('./../models/Gym.model')

router.get("/gyms", (req, res, next) => {

    Gym
        .find()
        .then(gyms => res.json(gyms))
        .catch(err => res.status(500).json({ message: 'Server issue D:', errorDetails: err }))
})


module.exports = router