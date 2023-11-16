const express = require('express')
const router = express.Router()

const { checkRole, isLoggedIn } = require('../middleware/route-guard')

const {
    gymMapRender,
    gymCreateRender,
    gymCreateHandler,
    gymEditRender,
    gymEditHandler,
    gymDeleteHandler,
    gymDetailsRender,

} = require('../controllers/gym.controllers')


router.get("/gym-map", isLoggedIn, gymMapRender)

router.get("/create", isLoggedIn, checkRole("Leader", "Admin"), gymCreateRender)
router.post("/create", isLoggedIn, checkRole("Leader", "Admin"), gymCreateHandler)

router.get("/edit/:gym_id", isLoggedIn, checkRole("Leader", "Admin"), gymEditRender)
router.post("/edit/:gym_id", isLoggedIn, checkRole("Leader", "Admin"), gymEditHandler)

router.post("/delete/:gym_id", isLoggedIn, checkRole("Leader", "Admin"), gymDeleteHandler)

router.get("/details/:gym_id", isLoggedIn, gymDetailsRender)

module.exports = router