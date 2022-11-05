import { inject, injectable } from "tsyringe";
import { IAddVideoDTO } from "../../dtos/add-video-dto";
import { IVideoRepository } from "../../repositories/video-repository";

@injectable()
class AddVideoUseCase {
  constructor(
    @inject("VideoRepository")
    private videoRepository: IVideoRepository
  ) { }

  async execute({ description, title, url }: IAddVideoDTO) {
    await this.videoRepository.add({ description, title, url })
  }
}

export { AddVideoUseCase }