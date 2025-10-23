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
import { stripeClient } from "../config/stripe";
import { Payment } from "../models/payment";
import { paymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats/nats-wrapper";

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

    const stripe = await stripeClient.paymentIntents.create({
      amount: order.price * 100,
      currency: "usd",
      payment_method: token,
      // confirm: true, // Uncomment if you want to confirm the payment immediately
      // https://docs.stripe.com/api/payment_intents/list
    });

    const payment = Payment.build({
      orderId: order.id,
      stripeId: stripe.id,
    });
    await payment.save();

    new paymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as newPaymentRouter };
