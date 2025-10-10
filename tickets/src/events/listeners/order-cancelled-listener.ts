import { Listener, OrderCancelledEvent, Subjects } from "@risvantickets/common";
import { Ticket } from "../../models/ticket";
import { Message } from "node-nats-streaming";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "ticket-service";
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Mark the ticket as being reserved by setting its orderId property
    // under the orderId property for optional checking errors, null can't  user
    ticket.set({ orderId: undefined });
    
    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        orderId: ticket.orderId,
        version: ticket.version
    })

    // ack the message
    msg.ack();
  }
}
