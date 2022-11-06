import { Account } from "../domain/entities/account-entity";

interface IAccountRepository {
  findByAuthAccountId(authAccountId: string): Promise<Account>
}

export { IAccountRepository }