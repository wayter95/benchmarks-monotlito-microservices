import express from "express";
import cors from "cors";
import { routes } from "./routes";
import './shared/container'
import { kafka } from "./infra/kafka";
import { CreateAccountController, IRequestCreateAccountDTO } from "./messaging/controllers/create-account.-controller";
import { AddVideoController, IRequestAddVideoController } from "./messaging/controllers/add-video-controller";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/customer', routes)

const consumer = kafka.consumer({ groupId: 'customer-group-receiver' })

async function run() {
  const createAccountController = new CreateAccountController()
  const addVideoController = new AddVideoController()

  await consumer.connect()

  await consumer.subscribe({ topics: ['authentication.signup', 'manager.add-video'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value && topic === 'authentication.signup') {
        const data = JSON.parse(String(message.value))

        await createAccountController.handle({ authAccountId: data.id, email: data.email, name: data.name })
      }

      if (message.value && topic === 'manager.add-video') {
        const data: IRequestAddVideoController = JSON.parse(String(message.value))

        await addVideoController.handle(data)
      }
    },
  });
}

run().catch(error => console.log(error))

export { app };