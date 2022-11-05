import { Router } from "express";
import { AuthAdminMiddleware } from "../middlewares/auth-admin-middleware";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { AddVideoController } from "../modules/videos/use-cases/add-video/add-video-controller";
import { ListVideoController } from "../modules/videos/use-cases/list-videos/list-video-controller";
import { WatchVideoController } from "../modules/videos/use-cases/watch-video/watch-video-controller";

const addVideoController = new AddVideoController()
const watchVideoController = new WatchVideoController()
const listVideoController = new ListVideoController()

const videoRoutes = Router()

videoRoutes.post('/', AuthAdminMiddleware, addVideoController.handle)
videoRoutes.get('/', AuthMiddleware, listVideoController.handle)
videoRoutes.get('/:id', AuthMiddleware, watchVideoController.handle)

export { videoRoutes }