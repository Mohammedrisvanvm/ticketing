export const stripeClient = {
  paymentIntents: {
    create: jest.fn().mockResolvedValue({ id: "pi_12345" }),
  },
};
