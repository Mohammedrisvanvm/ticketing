import mongoose from "mongoose";
import { natsWrapper } from "../../../nats/nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  orderStatus,
} from "@risvantickets/common";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 100,
    userId: "asdasd",
    status: orderStatus.Created,
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: { id: "asdasd" },
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("updates the order status to cancelled", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(data.id);
  expect(updatedOrder).toBeDefined();
  expect(updatedOrder!.status).toEqual(orderStatus.Cancelled);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
export { setup };
