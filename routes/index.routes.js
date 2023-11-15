// TODO: resolver esto

const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.currentUser) {
    const sessionUser = req.session.currentUser.username
    res.render("index", { sessionUser, isLoggedIn: true })
  } else {
    res.render("index");
  }

});

module.exports = router;
