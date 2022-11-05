import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAccountUseCase } from "./create-account-use-case";

class CreateAccountController {
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

      const { name, email, password, isAdmin } = request.body

      const createAccountUseCase = container.resolve(CreateAccountUseCase)

      await createAccountUseCase.execute({ name, email, password, isAdmin })

      return response.status(201).send()
    } catch (error) {
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { CreateAccountController }