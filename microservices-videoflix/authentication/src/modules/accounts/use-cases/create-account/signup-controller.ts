import { Request, Response } from "express";
import { container } from "tsyringe";
import { SignupAccountUseCase } from "./signup-use-case";

class SignupController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const requiredField = ['name', 'email', 'password']

      for (const field of requiredField) {
        if (!request.body[field]) {
          return response.status(400).json({
            success: false,
            message: `${field} is required!`
          })
        }
      }

      const { name, email, password } = request.body

      const createAccountUseCase = container.resolve(SignupAccountUseCase)

      await createAccountUseCase.execute({ name, email, password })

      return response.status(201).send()
    } catch (error) {
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { SignupController }