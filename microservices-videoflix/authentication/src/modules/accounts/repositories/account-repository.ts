import { Account } from "../domain/entities/account-entity";
import { ICreateAccountDTO } from "../dtos/create-account-dto";

interface IAccountRepository {
  create(data: ICreateAccountDTO): Promise<Account>
  findByEmail(email: string): Promise<Account>
}

export { IAccountRepository }