import Express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../error/bad-request-error";
import { validateRequest } from "../middleware/validation-request";
import { User } from "../models/user";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email in use");
    }
    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);

export { route as signUpRouter };
// export default signUpRouter;
