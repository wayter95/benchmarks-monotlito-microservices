import { instanceToInstance } from "class-transformer";
import { Account } from "../domain/entities/account-entity";
import { IAccountResponseDTO } from "../dtos";

class AccountMap {
  static toDto({ id, email, isAdmin, name, password, createdAt, isActive }: Account): IAccountResponseDTO {
    const account = instanceToInstance({
      id, email, isAdmin, name, password, createdAt, isActive
    })

    return account
  }
}

export { AccountMap }