import { errorHandler, NotFoundError } from "@risvantickets/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";

import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";

const app = express();

app.set("trust proxy", true); // trust first proxy
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); // Set secure to true in production

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export { app };

