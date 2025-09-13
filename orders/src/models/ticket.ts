import mongoose from "mongoose";
import { Order, orderStatus } from "./order";
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is non-negative
    },
  },
  {
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};
ticketSchema.methods.isReserved = async function () {
  const existingTicket = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        orderStatus.Created,
        orderStatus.AwaitingPayment,
        orderStatus.Complete,
      ],
    },
  });
  return !!existingTicket; // Return true if a reservation exists
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);
export { Ticket };
