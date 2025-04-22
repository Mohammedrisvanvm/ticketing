import Express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { BadRequestError } from "../error/bad-request-error";

const router = Express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    throw new BadRequestError("No JWT found in session");
  }

  try {
    const payload = Jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
// export default currentUserRouter;
