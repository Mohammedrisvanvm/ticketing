import { orderStatus } from "@risvantickets/common";
import mongoose from "mongoose";
import { TicketDoc } from "./ticket";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export {orderStatus}
interface OrderAttrs {
    userId: string;
    status: orderStatus;
    expiresAt: Date;
    ticket: TicketDoc
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    version: number;
    status: orderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}   


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(orderStatus),
        default: orderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            // ret.id = ret._id;
            // delete ret._id;
            // delete ret.__v;
        }
    }
});

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};


export const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);