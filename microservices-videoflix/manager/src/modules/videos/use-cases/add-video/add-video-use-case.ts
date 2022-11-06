import { inject, injectable } from "tsyringe";
import { Video } from "../../domain/entities/video-entity";
import { IAddVideoDTO } from "../../dtos/add-video-dto";
import { IVideoRepository } from "../../repositories/video-repository";

@injectable()
class AddVideoUseCase {
  constructor(
    @inject("VideoRepository")
    private videoRepository: IVideoRepository
  ) { }

  async execute({ description, title, url }: IAddVideoDTO): Promise<Video> {
    const video = await this.videoRepository.add({ description, title, url })

    return video
  }
}

export { AddVideoUseCase }