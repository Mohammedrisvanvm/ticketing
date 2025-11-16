import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats/nats-wrapper";

interface Payload {
  orderId: string;
}

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: 6379,
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    return 1000; // retry every second until connected
  },
});

const expirationQueue = new Queue<Payload>("order-expiration", {
  connection,
});

const worker = new Worker<Payload>(
  "order-expiration",
  async (job) => {
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
      orderId: job.data.orderId,
    });

    console.log("Expiration job completed:", job.data.orderId);
  },
  { connection }
);

export { expirationQueue, worker };
