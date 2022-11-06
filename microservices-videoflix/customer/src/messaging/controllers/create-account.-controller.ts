import { prisma } from "../../infra/prisma/client"

export interface IRequestCreateAccountDTO {
  authAccountId: string
  name: string
  email: string
}

class CreateAccountController {
  async handle({ authAccountId, email, name }: IRequestCreateAccountDTO) {
    await prisma.accounts.create({
      data: {
        authAccountId,
        email,
        name
      }
    })
  }
}

export { CreateAccountController }