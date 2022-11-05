import { prisma } from "../../../../../infra/prisma/client";
import { Account } from "../../../domain/entities/account-entity";
import { IAccountRepository } from "../../../repositories/account-repository";

class AccountPrismaRepository implements IAccountRepository {
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