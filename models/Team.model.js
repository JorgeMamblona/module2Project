const { Schema, model } = require("mongoose")

const teamSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        pokemon: {
            type: [String],
            validate: {
                validator: value => value.length <= 6,
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