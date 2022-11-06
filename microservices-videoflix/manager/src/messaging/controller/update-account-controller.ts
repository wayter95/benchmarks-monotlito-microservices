import { prisma } from "../../infra/prisma/client"

interface IRequestUpdateAccountControllerDTO {
  authAccountId: string
  receivedId: string
}
class UpdateAccountController {
  async handle({ authAccountId, receivedId }: IRequestUpdateAccountControllerDTO) {
    await prisma.accounts.update({
      where: {
        id: receivedId
      },
      data: {
        authAccountId
      }
    })
  }
}
export { UpdateAccountController, IRequestUpdateAccountControllerDTO }