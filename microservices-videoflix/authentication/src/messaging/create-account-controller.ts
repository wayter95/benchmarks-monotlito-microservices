import { CompressionTypes, Partitioners } from "kafkajs";
import { kafka } from "../infra/kafka";
import { prisma } from "../infra/prisma/client";

interface IRequestCreateAccountDTO {
  id: string
  name: string
  email: string
  password: string,
  isAdmin: boolean
}
class CreateAccountController {
  async handle({ name, email, password, isAdmin, id }: IRequestCreateAccountDTO) {
    const account = await prisma.accounts.create({
      data: {
        name,
        email,
        password,
        isAdmin
      }
    })

    const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });

    await producer.connect()

    await producer.send({
      topic: 'authentication.received-user',
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: JSON.stringify({ authAccountId: account.id, receivedId: id })
        }
      ]
    })

    await producer.disconnect()
  }
}

export { CreateAccountController, IRequestCreateAccountDTO }