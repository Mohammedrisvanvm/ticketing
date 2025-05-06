import { requireAuth, sessionUser } from "@risvantickets/common";
import Express, { Request, Response } from "express";

const router = Express.Router();

router.get(
  "/api/users/currentuser",
  sessionUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.status(200).json({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
// export default currentUserRouter;
