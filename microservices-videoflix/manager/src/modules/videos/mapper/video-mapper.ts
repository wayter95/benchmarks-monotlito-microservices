import { instanceToInstance } from "class-transformer";
import { Video } from "../domain/entities/video-entity";
import { IVideoResponseDTO } from "../dtos/video-response-dto";

class VideoMapper {
  static toDto({ id, createdAt, description, isActive, title, updatedAt, url }: Video): IVideoResponseDTO {
    const video = instanceToInstance({ id, createdAt, description, isActive, title, updatedAt, url })

    return video
  }
}

export { VideoMapper }