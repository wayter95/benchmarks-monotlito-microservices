import { Router } from "express";
import { AuthAdminMiddleware } from "../middlewares/auth-admin-middleware";
import { CreateAccountController } from "../modules/accounts/use-cases/create-account/create-account-controller";
import { ProfileAccountController } from "../modules/accounts/use-cases/profile-account/profile-account-controller";
import { AddVideoController } from "../modules/videos/use-cases/add-video/add-video-controller";
import { ListVideoController } from "../modules/videos/use-cases/list-videos/list-video-controller";

const profileAccountController = new ProfileAccountController()
const createAccountController = new CreateAccountController()

const addVideoController = new AddVideoController()
const listVideoController = new ListVideoController()

const routes = Router()

routes.get('/profile/:id', AuthAdminMiddleware, profileAccountController.handle)
routes.post('/account/create', AuthAdminMiddleware, createAccountController.handle)

routes.post('/video/add', AuthAdminMiddleware, addVideoController.handle)
routes.get('/videos', AuthAdminMiddleware, listVideoController.handle)

export { routes }