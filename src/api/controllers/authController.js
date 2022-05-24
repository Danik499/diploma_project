import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/User"
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const AuthController = {
    registration: async (req, res) => {
        try {
            const { email, password, name, subscription } = req.body

            const allUsers = await User.find();
            const role = allUsers[0] ? "user" : "admin";

            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "Such user already exists" })

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hashedPassword,
                name,
                role,
                subscriptionObjects: [subscription]
            });

            await user.save()

            return res.status(201).json({ userId: user._id, role })
        } catch (error) {
            return res.status(400).json({ error: `${error}` })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password, subscription } = req.body
            console.log(req.body)
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "Check your email or password" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: "Check your email or password" })

            user.subscriptionObjects.push(subscription)
            await user.save()

            return res.json({ userId: user._id, role: user.role })
        } catch (error) {
            return res.status(400).json({ error: `${error}` })
        }
    },

    logout: async (req, res) => {
        try {
            const { userId, subscription } = req.body
            const user = await User.findById(userId)
            for (let i = 0; i < user.subscriptionObjects.length; i++) {
                if (isEqual(user.subscriptionObjects[i], subscription)) {
                    user.subscriptionObjects.splice(i, 1)
                    break
                }
            }
            await User.findByIdAndUpdate(userId, user)
            res.send("OK")
        } catch (error) {
            throw new Error(error)
        }
    }
}

function isEqual(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2)
}


export default AuthController