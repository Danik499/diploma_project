import { Schema, model, Types } from "mongoose"

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    my_subscriptions: [{
        type: Types.ObjectId,
        ref: "Event"
    }]
})

export default model("User", schema)