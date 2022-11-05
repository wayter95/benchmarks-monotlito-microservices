import { container } from "tsyringe";
import { AccountPrismaRepository } from "../../modules/accounts/infra/prisma/repositories/account-prisma-repository";
import { IAccountRepository } from "../../modules/accounts/repositories/account-repository";
import { VideoPrismaRepository } from "../../modules/videos/infra/prisma/repositories/video-prisma-repository";
import { IVideoRepository } from "../../modules/videos/repositories/video-repository";

container.registerSingleton<IAccountRepository>(
  "AccountRepository",
  AccountPrismaRepository
);

container.registerSingleton<IVideoRepository>(
  "VideoRepository",
  VideoPrismaRepository
);
