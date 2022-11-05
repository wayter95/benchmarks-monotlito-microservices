import { Video } from "../domain/entities/video-entity"

interface IVideoRepository {
  list(): Promise<Video[]>
  findById(id: string): Promise<Video>
}

export { IVideoRepository }