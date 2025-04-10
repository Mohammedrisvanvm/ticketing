import Express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectionError } from "../error/database-connection-error";
const route = Express.Router();

route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage("password must be between 4 and 20 charactors"),
  ],
  (req: Request, res: Response): any => {
    const errors = validationResult(req);
    // throw new Error("1234567");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    throw new DatabaseConnectionError();
    const { email, password } = req.body;

    console.log("user created", email, password);

    res.send("hi there");
  }
);

export { route as signUpRouter };
// export default signUpRouter;
