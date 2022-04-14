import { Schema, model, Types } from "mongoose"

const schema = new Schema({
    name: { type: String, required: true },
    subscribers: [{
        type: Types.ObjectId,
        ref: "User"
    }]
})

export default model("Event", schema)