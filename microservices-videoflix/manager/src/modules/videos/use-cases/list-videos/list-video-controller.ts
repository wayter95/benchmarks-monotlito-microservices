import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListVideosUseCase } from "./list-video-use-case";

class ListVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listVideoUseCase = container.resolve(ListVideosUseCase)

      const videos = await listVideoUseCase.execute()

      return response.status(200).json({
        success: true,
        videos
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Server error!',
        error
      })
    }
  }
}

export { ListVideoController }