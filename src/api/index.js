import { Router } from "express"
import AuthController from "./controllers/authController"
import EventsController from "./controllers/eventsController"

const apiRouter = new Router()

apiRouter.post("/auth/registration", AuthController.registration)
apiRouter.post("/auth/login", AuthController.login)
apiRouter.post("/auth/logout", AuthController.logout)

apiRouter.post("/event/create", EventsController.create)
apiRouter.get("/event/load", EventsController.load)
apiRouter.get("/event/getSubscriptions", EventsController.getSubscriptions)
apiRouter.get("/event/search", EventsController.searchEvents)
apiRouter.put("/event/subscribe", EventsController.subscribe)
apiRouter.delete("/event/delete", EventsController.deleteEvent)
apiRouter.post("/event/sendNotification", EventsController.sendNotifications)
apiRouter.post("/event/getUserNotifications", EventsController.getUserNotifications)
apiRouter.post("/event/readNotifications", EventsController.readNotifications)
apiRouter.post("/event/startEmergency", EventsController.startEmergency)

export default apiRouter


