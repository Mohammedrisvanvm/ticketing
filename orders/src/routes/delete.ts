import Express, { Request, Response } from "express";


const router = Express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
//   const orders = await order.find({});
//   res.send(orders);
  res.send({});
});

export { router as deleteOrderRouter };
