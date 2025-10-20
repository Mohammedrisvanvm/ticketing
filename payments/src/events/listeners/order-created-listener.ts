import { Listener, OrderCreatedEvent, Subjects } from "@risvantickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  // Implementation of the listener
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        // Process the order created event
        const order=Order.build({
            id:data.id,
            price:data.ticket.price,
            userId:data.userId,
            status:data.status,
            version:data.version,
        });
        await order.save();
        console.log("Order created event data:", data);
        msg.ack();
    }
}