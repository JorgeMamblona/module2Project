const express = require('express')
const router = express.Router()

const { getGyms } = require('../controllers/api.controllers')

router.get("/gyms", getGyms)


module.exports = router