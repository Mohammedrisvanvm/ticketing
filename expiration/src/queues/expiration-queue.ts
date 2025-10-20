// import Queue from "bull";
// import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
// import { natsWrapper } from "../nats/nats-wrapper";

// interface Payload {
//   orderId: string;
// }
// const expirationQueue = new Queue<Payload>("order:expiration", {
//   redis: {
//     host: process.env.REDIS_HOST,
//   },
// });

// expirationQueue.process(async (job) => {
//   new ExpirationCompletePublisher(natsWrapper.client).publish({
//     orderId: job.data.orderId,
//   });
// });

// export { expirationQueue };

import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats/nats-wrapper";

interface Payload {
  orderId: string;
}

// Redis connection (BullMQ uses ioredis)
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  maxRetriesPerRequest: null,
});

// Create the queue
const expirationQueue = new Queue<Payload>("order-expiration", {
  connection,
});

// Worker to process jobs
const worker = new Worker<Payload>(
  "order-expiration",
  async (job) => {
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
      orderId: job.data.orderId,
    });
  },
  { connection }
);

export { expirationQueue, worker };
