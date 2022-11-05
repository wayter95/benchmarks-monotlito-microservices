import { ICreateAccountDTO } from "../../dtos";
import { IAccountRepository } from "../../repositories/account-repository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }

  async execute({ email, isAdmin, name, password }: ICreateAccountDTO) {
    const accountAlreadyExists = await this.accountRepository.findByEmail(email)

    if (accountAlreadyExists) {
      throw new Error('Account Already Exists!')
    }

    const passwordHash = await hash(password, 8);

    await this.accountRepository.create({ email, name, isAdmin, password: passwordHash })
  }
}
export { CreateAccountUseCase }