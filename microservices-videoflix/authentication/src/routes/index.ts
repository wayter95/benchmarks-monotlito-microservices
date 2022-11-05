import { Router } from "express";
import { AuthenticationAccountController } from "../modules/accounts/use-cases/authentication/authentication-account-controller";
import { SignupController } from "../modules/accounts/use-cases/create-account/signup-controller";

const authenticationAccountController = new AuthenticationAccountController()
const signupController = new SignupController()

const routes = Router()

routes.post('/signin', authenticationAccountController.handle)
routes.post('/signup', signupController.handle)

export { routes }