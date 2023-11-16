const { Schema, model } = require("mongoose")

const gymSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        image: {
            type: String,
            default: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/07/pokemon-gym-2.jpeg'
        },
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        },
    },
    {
        timestamps: true
    }
)

const Gym = model("Gym", gymSchema)

module.exports = Gym