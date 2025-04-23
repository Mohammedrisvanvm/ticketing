import request from "supertest";
import { app } from "../../app";

it("returns details about the current user", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "risvan@gmail.com",
      password: "123456",
    })
    .expect(201);

  const cookie = signupResponse.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("risvan@gmail.com");
});
