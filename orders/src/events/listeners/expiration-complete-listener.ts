import {
  ExpirationCompleteEvent,
  Listener,
  orderStatus,
  Subjects,
} from "@risvantickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = "orders-service";
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }
    
    order.status = orderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id },
    });
    
    msg.ack();
  }
}
