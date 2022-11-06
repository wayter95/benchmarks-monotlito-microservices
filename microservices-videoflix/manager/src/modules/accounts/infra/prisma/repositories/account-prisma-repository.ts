import { prisma } from "../../../../../infra/prisma/client";
import { Account } from "../../../domain/entities/account-entity";
import { ICreateAccountDTO } from "../../../dtos/create-account-dto";
import { IAccountRepository } from "../../../repositories/account-repository";

class AccountPrismaRepository implements IAccountRepository {
  async create(data: ICreateAccountDTO): Promise<Account> {
    const account = await prisma.accounts.create({ data })

    return account
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await prisma.accounts.findUnique({
      where: {
        email
      }
    })

    return account!
  }

  async findByAuthAccountId(authAccountId: string): Promise<Account> {
    const account = await prisma.accounts.findUnique({
      where: {
        authAccountId
      }
    })

    return account!
  }

}

export { AccountPrismaRepository }