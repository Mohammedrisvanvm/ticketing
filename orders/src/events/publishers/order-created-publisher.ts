import { Publisher, OrderCreatedEvent, Subjects } from "@risvantickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
