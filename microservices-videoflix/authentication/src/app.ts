import express from "express";
import cors from "cors";
import { routes } from "./routes";
import './shared/container'
import { kafka } from "./infra/kafka";
import { CreateAccountController, IRequestCreateAccountDTO } from "./messaging/create-account-controller";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/authentication', routes)

const consumer = kafka.consumer({ groupId: 'authentication-group-receiver' })

async function run() {
  const createAccountController = new CreateAccountController()

  await consumer.connect()

  await consumer.subscribe({ topic: 'manager.create-account', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const data: IRequestCreateAccountDTO = JSON.parse(String(message.value))

        await createAccountController.handle(data)
      }
    },
  });
}

run().catch(error => console.log(error))
export { app };