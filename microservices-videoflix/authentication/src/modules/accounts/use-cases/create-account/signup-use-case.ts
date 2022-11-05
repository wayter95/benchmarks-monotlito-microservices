import { ICreateAccountDTO } from "../../dtos/create-account-dto";
import { IAccountRepository } from "../../repositories/account-repository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
class SignupAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }

  async execute({ email, name, password }: ICreateAccountDTO): Promise<void> {
    const accountAlreadyExists = await this.accountRepository.findByEmail(email)

    if (accountAlreadyExists) {
      throw new Error('Account Already Exists!')
    }

    const passwordHash = await hash(password, 8);

    await this.accountRepository.create({ email, name, password: passwordHash })
  }
}
export { SignupAccountUseCase }