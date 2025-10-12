import { Listener, OrderCreatedEvent, Subjects } from "@risvantickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "expiration-service";
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    await expirationQueue.add({
      orderId: data.id,
    });
    msg.ack();
  }
}
