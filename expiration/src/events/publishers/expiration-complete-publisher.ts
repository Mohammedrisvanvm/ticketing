import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@risvantickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
