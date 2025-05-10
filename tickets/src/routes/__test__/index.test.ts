import Request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const createTicket = (title: string, price: number) => {
  return Request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
 await createTicket("ticket1", 20);
 await createTicket("ticket2", 30);
    await createTicket("ticket3", 40);
    const response = await Request(app).get("/api/tickets").send().expect(200);
    expect(response.body.length).toEqual(3);
   
});
