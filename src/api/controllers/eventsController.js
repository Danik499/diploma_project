import mongoose from "mongoose"
// import User from "../models/User"
import Event from "../models/Event"
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const EventsController = {
    create: async (req, res) => {
        try {
            const { name } = req.body
            const newEvent = new Event({ name })

            await newEvent.save()
            res.status(201).json({ message: "Event has been created", id: newEvent._id })
        } catch (error) {
            throw new Error(error)
        }
    },
    load: async (req, res) => {
        try {
            const allEvents = await Event.find()
            res.json(allEvents)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default EventsController