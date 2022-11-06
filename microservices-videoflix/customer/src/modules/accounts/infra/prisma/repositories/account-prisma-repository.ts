import { prisma } from "../../../../../infra/prisma/client";
import { Account } from "../../../domain/entities/account-entity";
import { IAccountRepository } from "../../../repositories/account-repository";

class AccountPrismaRepository implements IAccountRepository {
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