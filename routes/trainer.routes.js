const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware/route-guard')

const {
    addToTeamRender,
    deleteFromTeamRender,
    trainersListRender,
    myTeamRender
} = require('../controllers/tainers.controllers')


router.get("/my-team/add/:pokemon_name", isLoggedIn, addToTeamRender)

router.post("/my-team/delete/:pokemon_name", isLoggedIn, deleteFromTeamRender)

router.get("/", isLoggedIn, trainersListRender)

router.get("/my-team", isLoggedIn, myTeamRender)

module.exports = router