import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./error/not-found-error";

import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";

const app = express();

app.set("trust proxy", true); // trust first proxy
app.use(json());
app.use(cookieSession({ signed: false, secure: true })); // Set secure to true in production

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);


app.use(async (req, res, next) => {
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