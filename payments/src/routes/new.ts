import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  orderStatus,
  requireAuth,
  validateRequest,
} from "@risvantickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";

const router = Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().notEmpty(), body("orderId").not().notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === orderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for a cancelled order");
    }

    res.status(201).send({ success: true });
  }
);

export { router as newPaymentRouter };
