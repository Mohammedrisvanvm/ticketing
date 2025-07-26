import Request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats/nats-wrapper";


it("it has a route handler listening to /api/tickets for post requests", async () => {
  const response = await Request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("it can only be accessed if the user is signed in", async () => {
  const response = await Request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});
it("it returns a status other than 401 if the user is signed in", async () => {
  const response = await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
it("returns invalid input if the title or price is missing", async () => {
  await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);
  await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
  await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "awerwe", price: -10 })
    .expect(400);
  await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "qwewq" })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    const title = "1234";
    const price = 20;
  
    
    await Request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({ title, price })
        .expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(price);
    expect(tickets[0].title).toEqual(title);
});

it("wrapper test", async () => {
 
      console.log(natsWrapper.client.publish)                                                          
                                                              

})
