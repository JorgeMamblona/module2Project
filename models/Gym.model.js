const { Schema, model } = require("mongoose")

const gymSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
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