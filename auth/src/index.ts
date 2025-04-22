import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./error/not-found-error";
import connectDB from "./db/db-connect";
import { signInRouter } from "./routes/signin";

const app = express();

app.set("trust proxy", true); // trust first proxy
app.use(json());
app.use(cookieSession({ signed: false, secure: true })); // Set secure to true in production

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);

// This is a test to see if the error handler works
// app.get('*', () => {
//   throw new NotFoundError();
// });""

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

connectDB();

app.listen(3000, () => console.log("listen on 3000!!!!"));
