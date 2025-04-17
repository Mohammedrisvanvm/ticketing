import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./error/not-found-error";

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);

// This is a test to see if the error handler works
// app.get('*', () => {
//   throw new NotFoundError();
// });""


function delay(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.use(async (req, res, next) => {
  await delay(3000);
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

app.listen(3000, () => console.log("listen on 3000!!!!"));
