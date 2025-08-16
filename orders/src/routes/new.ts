import { requireAuth, validateRequest } from "@risvantickets/common";
import Express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = Express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId must be provided"),
  ],validateRequest,
  async (req: Request, res: Response) => {
    //   const orders = await order.find({});
    //   res.send(orders);
    res.send({});
  }
);

export { router as newOrderRouter };
