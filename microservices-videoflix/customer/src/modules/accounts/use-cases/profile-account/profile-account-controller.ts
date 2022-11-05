import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileAccountUseCase } from "./profile-acoount-use-case";

class ProfileAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const profileAccountUseCase = container.resolve(ProfileAccountUseCase)

      const { id } = request.params

      if (!id) {
        return response.status(400).json({
          success: false,
          message: `Account id is required!`
        })
      }

      const account = await profileAccountUseCase.execute(id)

      return response.status(200).json({
        success: true,
        account
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { ProfileAccountController }