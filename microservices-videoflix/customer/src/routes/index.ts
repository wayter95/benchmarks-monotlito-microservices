import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { ProfileAccountController } from "../modules/accounts/use-cases/profile-account/profile-account-controller";
import { ListVideoController } from "../modules/videos/use-cases/list-videos/list-video-controller";
import { WatchVideoController } from "../modules/videos/use-cases/watch-video/watch-video-controller";

const profileAccountController = new ProfileAccountController()
const listVideoController = new ListVideoController()
const watchVideoController = new WatchVideoController()

const routes = Router()

routes.get('/profile/:id', AuthMiddleware, profileAccountController.handle)
routes.get('/videos', AuthMiddleware, listVideoController.handle)
routes.get('/video/:id', AuthMiddleware, watchVideoController.handle)

export { routes }