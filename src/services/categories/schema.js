import mongoose from "mongoose"

const { Schema, model } = mongoose

const CategorySchema = new Schema({
    name: { type: String, required: true }
},
{ timestamps: true },
)

export default model("Category", CategorySchema)