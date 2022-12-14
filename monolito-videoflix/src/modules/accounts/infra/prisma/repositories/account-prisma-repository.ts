import { prisma } from "../../../../../infra/prisma/client";
import { Account } from "../../../domain/entities/account-entity";
import { ICreateAccountDTO } from "../../../dtos";
import { IAccountRepository } from "../../../repositories/account-repository";

class AccountPrismaRepository implements IAccountRepository {
  async create(data: ICreateAccountDTO): Promise<void> {
    await prisma.accounts.create({ data })
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await prisma.accounts.findUnique({
      where: {
        email
      }
    })

    return account!
  }

  async findById(id: string): Promise<Account> {
    const account = await prisma.accounts.findUnique({
      where: {
        id
      }
    })

    return account!
  }

}

export { AccountPrismaRepository }