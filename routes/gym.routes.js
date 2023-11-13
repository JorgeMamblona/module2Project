const express = require('express')
const router = express.Router()

router.get("/gym-map", (req, res, next) => {
    res.render('gym/map')
})

module.exports = router