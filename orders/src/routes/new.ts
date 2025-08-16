import {
  BadRequestError,
  NotFoundError,
  orderStatus,
  requireAuth,
  validateRequest,
} from "@risvantickets/common";
import Express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = Express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 ; // Order expires in 15 minutes
router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Validate that the ticket exists
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    // Check if the ticket is already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // Calculate expiration time for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS); // Order expires in 15 seconds for testing * 60 min

    // Create a new order

    const order =  Order.build({
      userId: req.currentUser!.id,
      status: orderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });

    await order.save();
    // Publish an event (if using an event bus)

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
