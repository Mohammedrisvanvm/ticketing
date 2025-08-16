import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";


it("marks an order as cancelled", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });
  await ticket.save();

  // Create an order as the user
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);


    
  // Cancel the order
  await request(app)
    .delete(`/api/orders/${order._id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // Check that the order is cancelled
  const fetchedOrder = await request(app)
    .get(`/api/orders/${order._id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.body.status).toEqual("cancelled");
});