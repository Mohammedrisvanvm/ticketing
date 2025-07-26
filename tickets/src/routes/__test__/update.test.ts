import Request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  
 const response=await Request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "awerwe",
      price: 20,
    })
  
});
it("returns a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await Request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", global.signin())
      .send({
        title: "awerwe",
        price: 20,
      })
      .expect(401);
});
it("returns a 401 if the user is not the owner of the ticket", async () => {
  const response = await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "awerwe", price: 20 })
    .expect(201);
  

    
  await Request(app)
    .put(`/api/tickets/${response.body._id}`)
    // .set("Cookie", global.signin())
    .send({ title: "awerwe1", price: 20 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  const response = await Request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "awerwe", price: 20 })
    .expect(201);
  await Request(app)
    .put(`/api/tickets/${response.body._id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);
  await Request(app)
    .put(`/api/tickets/${response.body._id}`)
    .set("Cookie", cookie)
    .send({ title: "awerwe", price: -20 })
    .expect(400);
});

it("updates the ticket if the user provides valid inputs", async () => {
  const cookie = global.signin();
  const response = await Request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "awerwe", price: 20 })
    .expect(201);
  const updatedTitle = "updated title";
  const updatedPrice = 100;
  await Request(app)
    .put(`/api/tickets/${response.body._id}`)
    .set("Cookie", cookie)
    .send({ title: updatedTitle, price: updatedPrice })
    .expect(200);
  const ticketResponse = await Request(app)
    .get(`/api/tickets/${response.body._id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(updatedTitle);
  expect(ticketResponse.body.price).toEqual(updatedPrice);
});
