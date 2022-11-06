import { Request, Response } from "express";
import { container } from "tsyringe";
import { kafka } from "../../../../infra/kafka";
import { SignupAccountUseCase } from "./signup-use-case";
import { CompressionTypes, Partitioners } from 'kafkajs';

class SignupController {
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

      const { name, email, password } = request.body

      const createAccountUseCase = container.resolve(SignupAccountUseCase)

      const account = await createAccountUseCase.execute({ name, email, password })

      const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

      await producer.connect()

      await producer.send({
        topic: 'authentication.signup',
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

export { SignupController }