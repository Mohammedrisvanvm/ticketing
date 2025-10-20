import {
  Listener,
  OrderCancelledEvent,
  orderStatus,
  Subjects,
} from "@risvantickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  // Implementation for OrderCancelledListener
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Process the order cancelled event

    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Order not found");
    }
    order.status = orderStatus.Cancelled;
    await order.save();

    msg.ack();
  }
}
