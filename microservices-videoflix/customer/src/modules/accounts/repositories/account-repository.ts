import { Account } from "../domain/entities/account-entity";

interface IAccountRepository {
  findById(id: string): Promise<Account>
}

export { IAccountRepository }