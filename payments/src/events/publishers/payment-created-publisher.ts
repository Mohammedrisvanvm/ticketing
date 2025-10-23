import { PaymentCreatedEvent, Publisher, Subjects } from "@risvantickets/common";

export class paymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated =Subjects.PaymentCreated ;
}