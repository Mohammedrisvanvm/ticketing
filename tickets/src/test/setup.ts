import Jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "test";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a jwt payload { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "risvantest@gmail.com",
  };

  // Create the JWT!

  const token = Jwt.sign(payload, process.env.JWT_KEY!);
  // Take the JWT and store it on the session object
  const session = { jwt: token };
  // turn the session as json
  const sessionJSON = JSON.stringify(session);
  // turn the json into base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string that is the cookie with the encoded data

  return [`session=${base64}`];
};
