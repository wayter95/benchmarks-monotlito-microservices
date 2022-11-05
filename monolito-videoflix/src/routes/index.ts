import { Router } from "express";
import { accountRoutes } from "./accoun-routes";
import { videoRoutes } from "./video-routes";

const routes = Router()

routes.use('/account', accountRoutes)
routes.use('/video', videoRoutes)

export { routes }