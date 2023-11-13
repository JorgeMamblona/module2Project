const { Schema, model } = require("mongoose")

const teamSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        pokemon: {
            type: [Number],
            validate: {
                validator: pokemon => pokemon.length <= 6,
                message: "Max number of Pokémon reached."
            }
        }
    },
    {
        timestamps: true

    }
)


const Team = model("Team", teamSchema)

module.exports = Team