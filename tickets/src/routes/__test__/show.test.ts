import Request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the route does not exist", async () => {
  await Request(app).post("/api/tickets/warreazsres").send();
  expect(404);
});
it("return ticket if the ticket is found", async () => {
  const title = "awerwe";
  const price = 20;
  
  const response = await Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);
 
  const ticketResponse = await Request(app)
    .get(`/api/tickets/${response.body._id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
it("it has a route handler listening to /api/tickets for post requests", async () => {
  const response = await Request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});
