import { container } from "tsyringe";
import { AccountPrismaRepository } from "../../modules/accounts/infra/prisma/repositories/account-prisma-repository";
import { IAccountRepository } from "../../modules/accounts/repositories/account-repository";

container.registerSingleton<IAccountRepository>(
  "AccountRepository",
  AccountPrismaRepository
);
