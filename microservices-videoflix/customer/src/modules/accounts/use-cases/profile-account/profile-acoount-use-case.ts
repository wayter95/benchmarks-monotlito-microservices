import { inject, injectable } from "tsyringe";
import { IAccountResponseDTO } from "../../dtos/account-response-dto";
import { AccountMap } from "../../mapper/account-mapper";
import { IAccountRepository } from "../../repositories/account-repository";

@injectable()
class ProfileAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }

  async execute(id: string): Promise<IAccountResponseDTO> {
    const account = await this.accountRepository.findById(id)

    return AccountMap.toDto(account)
  }
}

export { ProfileAccountUseCase }