import Express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../error/bad-request-error";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // throw new Error("1234567");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { route as signUpRouter };
// export default signUpRouter;
