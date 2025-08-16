import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@risvantickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
