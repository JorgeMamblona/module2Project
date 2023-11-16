const Gym = require('./../models/Gym.model')

const getGyms = (req, res) => {

    Gym
        .find()
        .then(gyms => res.json(gyms))
        .catch(err => res.status(500).json({ message: 'Server issue D:', errorDetails: err }))
}

module.exports = {
    getGyms
}