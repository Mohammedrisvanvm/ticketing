import { Listener, Subjects, TicketCreatedEvent } from "@risvantickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "orders-service";
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    Ticket.build({
      id,
      title,
      price,
    }).save();

    msg.ack();
  }
}
