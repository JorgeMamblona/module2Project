
const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect("/login")
    }
}

const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect("/")
    }
}

const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.session.currentUser

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.redirect("/login")
    }
}

// const renderNavbar = (req, res, next) => {

//     const role = req.session.currentUser.role

//     if(!req.session.currentUser){
//         res.locals.navbar = "default-navbar"
//     }

//     else if (req.session.currentUser){
//         if (role === "Trainer"){
//             res.locals.navbar = "trainer-navbar"
//         }
//     }

//     //check if user is logged in - show one bar if not.
//     //if user IS logged in, show different navbars depending on user role.
// }

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRole
}