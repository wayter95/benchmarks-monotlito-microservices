import { Account } from "../domain/entities/account-entity";
import { ICreateAccountDTO } from "../dtos";

interface IAccountRepository {
  create(data: ICreateAccountDTO): Promise<void>
  findByEmail(email: string): Promise<Account>
  findById(id: string): Promise<Account>
}

export { IAccountRepository }