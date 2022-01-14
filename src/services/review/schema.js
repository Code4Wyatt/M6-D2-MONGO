import mongoose from "mongoose"

const { Schema, model } = mongoose

const ReviewSchema = new Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, required: true },
},
{ timestamps: true },
)

export default model("Review", ReviewSchema)