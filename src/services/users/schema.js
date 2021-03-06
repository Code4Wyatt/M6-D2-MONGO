import mongoose from "mongoose" 

const { Schema, model } = mongoose

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
},
    { timestamps: true },
)

export default model("User", UserSchema)