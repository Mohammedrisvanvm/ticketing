import { NotFoundError } from "@risvantickets/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
 
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    // 404 not found
    throw new NotFoundError();
  }
  res.send(ticket);
});

export { router as showTicketRouter };
