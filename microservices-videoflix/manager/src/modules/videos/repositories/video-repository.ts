import { Video } from "../domain/entities/video-entity"
import { IAddVideoDTO } from "../dtos/add-video-dto"

interface IVideoRepository {
  add(data: IAddVideoDTO): Promise<Video>
  list(): Promise<Video[]>
  findById(id: string): Promise<Video>
}

export { IVideoRepository }