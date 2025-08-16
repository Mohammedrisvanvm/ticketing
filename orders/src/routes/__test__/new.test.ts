import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, orderStatus } from "../../models/order";
import { natsWrapper } from "../../nats/nats-wrapper";

it("returns a 404 if the ticket does not exist", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: new mongoose.Types.ObjectId().toHexString() })
    .expect(404);
});

it("returns a 400 if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    userId: "testUserId",
    status: orderStatus.Created,
    expiresAt: new Date(),
    ticket: ticket,
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("ticket reservation is successful", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });
  await ticket.save();
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
