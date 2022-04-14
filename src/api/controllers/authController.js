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
            const { email, password, name } = req.body

            const allUsers = await User.find();
            const role = allUsers[0] ? "user" : "admin";

            const candidate = await User.findOne({ email })
            if (candidate) return res.status(400).json({ message: "Such user already exists" })

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hashedPassword,
                name,
                role
            });

            await user.save()

            return res.status(201).json({ userId: user._id, role })
        } catch (error) {
            return res.status(400).json({ error: `${error}` })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ message: "Check your email or password" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: "Check your email or password" })

            return res.json({ userId: user._id, role: user.role })
        } catch (error) {
            return res.status(400).json({ error: `${error}` })
        }
    }
}

export default AuthController