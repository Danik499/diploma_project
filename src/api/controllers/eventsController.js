import mongoose from "mongoose"
import Event from "../models/Event"
import User from "../models/User"
import webpush from "web-push"
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

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
    },
    getSubscriptions: async (req, res) => {
        try {
            let user = await User.findById(req.query.userId)
            let userEventsIds = user.mySubscriptions
            let userEvents = []
            for (let e of userEventsIds) {
                userEvents.push(await Event.findById(e))
            }
            res.send(userEvents)
        } catch (error) {
            throw new Error(error)
        }
    },
    searchEvents: async (req, res) => {
        try {
            const search = req.query.search
            const allEvents = await Event.find()
            let searched = []
            for (let event of allEvents) {
                if (event.name.includes(search)) searched.push(event)
            }
            res.send(searched)
        } catch (error) {
            throw new Error(error)
        }
    },
    subscribe: async (req, res) => {
        try {
            const userId = mongoose.Types.ObjectId(req.body.userId)
            const eventId = req.body.eventId
            let user = await User.findById(userId)
            let event = await Event.findById(mongoose.Types.ObjectId(eventId))
            if (user.mySubscriptions.includes(eventId)) {
                user.mySubscriptions.splice(user.mySubscriptions.indexOf(eventId), 1)
                event.subscribers.splice(event.subscribers.indexOf(userId), 1)
                await Event.findByIdAndUpdate(eventId, event)
                await User.findByIdAndUpdate(userId, user)
                res.send("Unsubscribed successfully")
            }
            else {
                event.subscribers.push(userId)
                user.mySubscriptions.push(eventId)
                await Event.findByIdAndUpdate(eventId, event)
                await User.findByIdAndUpdate(userId, user)
                res.send("Subscribed successfully")
            }
        } catch (error) {
            throw new Error(error)
        }
    },

    sendNotifications: async (req, res) => {
        try {
            const { eventId, notificationText } = req.body
            const event = await Event.findById(eventId)
            let subObjects = []
            for (let sub of event.subscribers) {
                let user = await User.findById(sub)
                console.log(user.subscriptionObjects, user)
                subObjects.push(...user.subscriptionObjects)
            }

            const payload = JSON.stringify({
                title: notificationText,
            });

            for (let s of subObjects) {
                webpush
                    .sendNotification(s, payload)
                    .catch(err => console.error(err));
            }
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default EventsController