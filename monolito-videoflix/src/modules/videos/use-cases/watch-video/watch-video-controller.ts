import { Request, Response } from "express";
import { container } from "tsyringe";
import { WatchVideoUseCase } from "./watch-video-use-case";

class WatchVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const watchVideoUseCase = container.resolve(WatchVideoUseCase)

      const { id } = request.params

      if (!id) {
        return response.status(400).json({
          success: false,
          message: 'Video id is required!'
        })
      }

      const video = await watchVideoUseCase.execute(id)

      return response.status(200).json({
        success: true,
        video
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { WatchVideoController }