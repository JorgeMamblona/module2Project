module.exports = app => {
    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)

    const pokemonRoutes = require("./pokemon.routes")
    app.use("/pokemon", pokemonRoutes)

    const trainerRoutes = require("./trainer.routes")
    app.use("/trainers", trainerRoutes)

    const gymRoutes = require("./gym.routes")
    app.use("/gym", gymRoutes)

}