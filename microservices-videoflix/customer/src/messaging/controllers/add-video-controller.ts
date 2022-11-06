import { prisma } from "../../infra/prisma/client"

export interface IRequestAddVideoController {
  title: string
  description: string
  url: string
}

class AddVideoController {
  async handle({ title, url, description }: IRequestAddVideoController) {
    await prisma.video.create({
      data: {
        title,
        description,
        url
      }
    })
  }
}

export { AddVideoController }