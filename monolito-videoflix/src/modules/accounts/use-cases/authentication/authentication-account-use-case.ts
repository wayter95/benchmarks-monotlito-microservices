import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../../repositories/account-repository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticationAccountDTO {
  email: string,
  password: string
}

interface IResponseAuthenticationAccountDTO {
  user: {
    id: string
    name: string
    email: string
    isAdmin: boolean
  },
  token: string
}

@injectable()
class AuthenticationAccountUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }
  async execute({ email, password }: IAuthenticationAccountDTO): Promise<IResponseAuthenticationAccountDTO> {
    const account = await this.accountRepository.findByEmail(email)

    if (!account) {
      throw new Error('Account does not exists!')
    }

    const passwordMatch = await compare(password, account.password!);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!')
    }

    const token = sign({ id: account.id }, process.env.JWT_SECRET as string, {
      subject: account.id,
      expiresIn: '1h',
    });

    const result: IResponseAuthenticationAccountDTO = {
      token,
      user: {
        id: account.id,
        name: account.name!,
        email: account.email!,
        isAdmin: account.isAdmin!
      }
    }

    return result
  }
}

export { AuthenticationAccountUseCase }