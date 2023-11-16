const express = require('express')
const router = express.Router()

const indexRender = require('../controllers/index.controllers')

router.get("/", indexRender)

module.exports = router
