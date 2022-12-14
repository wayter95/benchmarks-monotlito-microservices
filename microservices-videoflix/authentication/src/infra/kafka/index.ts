import { Kafka } from 'kafkajs';

const broker = process.env.BROKER_KAFKA

const kafka = new Kafka({
  brokers: [broker as string],
  clientId: 'authentication',
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
})

export { kafka }