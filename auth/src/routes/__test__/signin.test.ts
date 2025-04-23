import request from "supertest";
import { app } from "../../app";

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "risvangmail.com",
      password: "123456",
    })
    .expect(400);
});
it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "risvan@gmail.com",
      password: "123",
    })
    .expect(400);
});
it("returns a 400 with missing email and password", async () => {
  await request(app).post("/api/users/signin").send({}).expect(400);
});

it("email not found", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "risva@gmail.com",
      password: "123456",
    })
    .expect(400);
});

it("password not found", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "risvan@gmail.com",
      password: "12345",
    })
    .expect(400);
});

it("cookie after successful signin", async () => {
 await request(app)
    .post("/api/users/signup")
    .send({
      email: "risvan@gmail.com",
      password: "123456",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "risvan@gmail.com",
      password: "123456",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
