const express = require("express")
const router = express.Router()

const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")

const {
    registerRender,
    registerHandler,
    loginRender,
    loginHandler,
    logoutHandler
} = require("../controllers/auth.controllers")


router.get("/register", isLoggedOut, registerRender)
router.post("/register", isLoggedOut, registerHandler)

router.get("/login", isLoggedOut, loginRender)
router.post("/login", isLoggedOut, loginHandler)

router.get("/logout", isLoggedIn, logoutHandler)

module.exports = router