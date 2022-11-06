import { prisma } from "../../../../../infra/prisma/client";
import { Video } from "../../../domain/entities/video-entity";
import { IAddVideoDTO } from "../../../dtos/add-video-dto";
import { IVideoRepository } from "../../../repositories/video-repository";

class VideoPrismaRepository implements IVideoRepository {
  async add(data: IAddVideoDTO): Promise<Video> {
    const video = await prisma.video.create({ data })

    return video
  }

  async list(): Promise<Video[]> {
    const videos = await prisma.video.findMany()

    return videos
  }

  async findById(id: string): Promise<Video> {
    const video = await prisma.video.findUnique({
      where: {
        id
      }
    })

    return video!
  }

}

export { VideoPrismaRepository }