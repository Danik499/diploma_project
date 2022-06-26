import mongoose from "mongoose"
import Event from "../models/Event"
import User from "../models/User"
import Notification from "../models/Notification"
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

            newEvent.subscribersCount = 0

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
                event.subscribersCount = event.subscribers.length
                await Event.findByIdAndUpdate(eventId, event)
                await User.findByIdAndUpdate(userId, user)
                res.send("Unsubscribed successfully")
            }
            else {
                event.subscribers.push(userId)
                user.mySubscriptions.push(eventId)
                event.subscribersCount = event.subscribers.length
                await Event.findByIdAndUpdate(eventId, event)
                await User.findByIdAndUpdate(userId, user)
                res.send("Subscribed successfully")
            }
        } catch (error) {
            throw new Error(error)
        }
    },

    deleteEvent: async (req, res) => {
        try {
            await Event.findByIdAndDelete(req.query.id)
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    },

    sendNotifications: async (req, res) => {
        try {
            const { eventId, notificationText } = req.body
            const event = await Event.findById(eventId)
            let notif = new Notification({ title: notificationText })
            let subObjects = []
            for (let sub of event.subscribers) {
                let user = await User.findById(sub)
                user.notificationsHistory.unshift({
                    notificationId: notif._id,
                    title: notificationText,
                    isRead: false
                })
                user.save()
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

            notif.date = formatDate(new Date())
            notif.eventName = event.name
            await notif.save()

            event.lastPosted = formatDate(new Date())
            await event.save()
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    },
    getUserNotifications: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId)
            let result = []
            for (let n of user.notificationsHistory) {
                let notif = JSON.parse(JSON.stringify(await Notification.findById(n.notificationId)))
                notif.isRead = n.isRead
                result.push(notif)
            }
            res.send(result)
        } catch (error) {
            throw new Error(error)
        }
    },
    readNotifications: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId)
            for (let n of user.notificationsHistory) {
                if (n.isRead) break
                n.isRead = true
            }
            await User.findByIdAndUpdate(req.body.userId, user)
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    },
    startEmergency: async (req, res) => {
        try {
            const allUsers = await User.find()
            let payload = JSON.stringify({
                title: req.body.emergencyText
            })
            for (let user of allUsers) {
                for (let s of user.subscriptionObjects) {
                    webpush
                        .sendNotification(s, payload)
                        .catch(err => console.error(err));
                }
            }
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export default EventsController