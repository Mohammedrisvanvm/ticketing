import { orderStatus } from "@risvantickets/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface OrderAttrs {
  id: string;
  status: orderStatus;
  userId: string;
  price: number;
  version: number;
}

interface OrderDoc extends mongoose.Document {
  status: orderStatus;
  userId: string;
  price: number;
  version: number;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
  },            
     {
    toJSON: {
      transform(doc, ret) {},
    },
  });

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);
 
orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        status: attrs.status,
        userId: attrs.userId,
        price: attrs.price,
        version: attrs.version,
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
export { Order };
