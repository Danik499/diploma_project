import { Router } from "express"
import AuthController from "./controllers/authController"
import EventsController from "./controllers/eventsController"

const apiRouter = new Router()

apiRouter.post("/auth/registration", AuthController.registration)
apiRouter.post("/auth/login", AuthController.login)

apiRouter.post("/event/create", EventsController.create)
apiRouter.get("/event/load", EventsController.load)

export default apiRouter