import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAccountUseCase } from "./create-account-use-case";
import { kafka } from "../../../../infra/kafka";
import { CompressionTypes, Partitioners } from 'kafkajs';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const requiredField = ['name', 'email', 'password']

      for (const field of requiredField) {
        if (!request.body[field]) {
          return response.status(400).json({
            success: false,
            message: `${field} is required!`
          })
        }
      }

      const { name, email, password, isAdmin } = request.body

      const createAccountUseCase = container.resolve(CreateAccountUseCase)

      const account = await createAccountUseCase.execute({ name, email, password, isAdmin })

      const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

      await producer.connect()

      await producer.send({
        topic: 'manager.create-account',
        compression: CompressionTypes.GZIP,
        messages: [
          {
            value: JSON.stringify(account)
          }
        ]
      })

      await producer.disconnect()

      return response.status(201).send()
    } catch (error) {
      return response.status(500).json({
        success: false,
        error
      })
    }
  }
}

export { CreateAccountController }