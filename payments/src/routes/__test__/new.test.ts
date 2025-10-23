import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { orderStatus } from "@risvantickets/common";

it("returns 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "tok_visa",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 when purchasing an order that doesnt belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: orderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: orderStatus.Cancelled,
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
      token: "tok_visa",
    })
    .expect(400);
});

// Add more tests as needed, e.g., for successful payment processing
it("returns 201 with valid inputs", async () => {});
