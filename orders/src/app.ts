import {
  errorHandler,
  NotFoundError,
  sessionUser,
} from "@risvantickets/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true); // trust first proxy
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); // Set secure to true in production
app.use(sessionUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

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
