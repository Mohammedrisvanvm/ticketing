import Express, { Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotAuthorizedError,
  NotFoundError,
  orderStatus,
} from "@risvantickets/common";

const router = Express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = orderStatus.Cancelled;
  await order.save();

  // emit an event here

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
