import { Video } from "../../domain/entities/video-entity";
import { inject, injectable } from "tsyringe";
import { IVideoRepository } from "../../repositories/video-repository";
import { VideoMapper } from "../../mapper/video-mapper";

@injectable()
class WatchVideoUseCase {
  constructor(
    @inject("VideoRepository")
    private videoRepository: IVideoRepository
  ) { }
  async execute(id: string): Promise<Video> {
    const video = await this.videoRepository.findById(id)

    return VideoMapper.toDto(video)
  }
}

export { WatchVideoUseCase }