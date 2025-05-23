import request from "supertest";
import { app } from "../../app";

it("returns details about the current user", async () => {
  const cookie = await signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("risvan@gmail.com");
});

it("returns null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);
  expect(response.body).toEqual({ errors: [{ message: "Not authorized" }] });
});
