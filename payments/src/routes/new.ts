import { requireAuth } from "@risvantickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().notEmpty(),
    body("orderId").not().notEmpty()
 ],
  async(req: Request, res: Response) => {
    res.send("Create a new payment");
  }
);

export { router as newPaymentRouter };
