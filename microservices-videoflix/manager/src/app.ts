import express from "express";
import cors from "cors";
import { routes } from "./routes";
import './shared/container'
import { kafka } from "./infra/kafka";
import { IRequestUpdateAccountControllerDTO, UpdateAccountController } from "./messaging/controller/update-account-controller";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/manager', routes)

const consumer = kafka.consumer({ groupId: 'manager-group-receiver' })

async function run() {
  const updateAccountController = new UpdateAccountController()

  await consumer.connect()

  await consumer.subscribe({ topic: 'authentication.received-user', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        console.log(JSON.parse(String(message.value)))
        const data: IRequestUpdateAccountControllerDTO = JSON.parse(String(message.value))

        await updateAccountController.handle(data)
      }
    },
  });
}

run().catch(error => console.log(error))

export { app };