import { Schema, model, Types } from "mongoose"

const schema = new Schema({
    title: { type: String, required: true },
    eventName: { type: String },
    date: { type: String },
    authorName: { type: String }
})

export default model("Notification", schema)