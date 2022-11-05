import { Video } from "../../domain/entities/video-entity";
import { inject, injectable } from "tsyringe";
import { IVideoRepository } from "../../repositories/video-repository";

@injectable()
class ListVideosUseCase {
  constructor(
    @inject("VideoRepository")
    private videoRepository: IVideoRepository
  ) { }
  async execute(): Promise<Video[]> {
    const videos = await this.videoRepository.list()

    return videos
  }
}

export { ListVideosUseCase }