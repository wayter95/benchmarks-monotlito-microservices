import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { AuthenticationAccountController } from "../modules/accounts/use-cases/authentication/authentication-account-controller";
import { CreateAccountController } from "../modules/accounts/use-cases/create-account/create-account-controller";
import { ProfileAccountController } from "../modules/accounts/use-cases/profile-account/profile-account-controller";

const createAccountController = new CreateAccountController()
const profileAccountController = new ProfileAccountController()
const authenticationAccountController = new AuthenticationAccountController()

const accountRoutes = Router()

accountRoutes.post('/', createAccountController.handle)
accountRoutes.get('/:id', AuthMiddleware, profileAccountController.handle)
accountRoutes.post('/authentication', authenticationAccountController.handle)

export { accountRoutes }