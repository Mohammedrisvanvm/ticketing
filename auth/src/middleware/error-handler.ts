import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { CustomError } from "../error/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res
    .status(400)
    .send({ errors: [{ message: "something went wrong" }] });
};
