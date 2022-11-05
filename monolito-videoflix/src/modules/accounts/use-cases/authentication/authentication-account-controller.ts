import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationAccountUseCase } from "./authentication-account-use-case";

class AuthenticationAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const authenticationAccountUseCase = container.resolve(AuthenticationAccountUseCase)

      const requiredField = ['email', 'password']

      for (const field of requiredField) {
        if (!request.body[field]) {
          return response.status(400).json({
            success: false,
            message: `${field} is required`
          })
        }
      }

      const { email, password } = request.body

      const result = await authenticationAccountUseCase.execute({ email, password })

      return response.status(200).json({
        success: true,
        result
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        success: false,
        message: 'Server Error',
        error
      })
    }
  }
}

export { AuthenticationAccountController }