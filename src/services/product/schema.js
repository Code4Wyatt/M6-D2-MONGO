import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: { type: Schema.Types.ObjectId, ref: "Review" }
})

export default model("Product", ProductSchema)