import { Request, Response } from "express";
import { CompressionTypes, Partitioners } from "kafkajs";
import { container } from "tsyringe";
import { kafka } from "../../../../infra/kafka";
import { AddVideoUseCase } from "./add-video-use-case";

class AddVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const requiredField = ['title', 'description', 'url']

      for (const field of requiredField) {
        if (!request.body[field]) {
          return response.status(400).json({
            success: false,
            message: `${field} is required!`
          })
        }
      }

      const { title, description, url } = request.body

      const addVideoUseCase = container.resolve(AddVideoUseCase)

      const video = await addVideoUseCase.execute({ title, description, url })

      const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

      await producer.connect()

      await producer.send({
        topic: 'manager.add-video',
        compression: CompressionTypes.GZIP,
        messages: [
          {
            value: JSON.stringify(video)
          }
        ]
      })

      await producer.disconnect()

      return response.status(201).send()
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { AddVideoController }