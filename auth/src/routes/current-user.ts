import Express, { Request, Response } from "express";
import { requireAuth } from "../middleware/require-auth";
import { sessionUser } from "../middleware/session-user";

const router = Express.Router();

router.get(
  "/api/users/currentuser",
  sessionUser,requireAuth,
  (req: Request, res: Response) => {
    res.send({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
// export default currentUserRouter;
