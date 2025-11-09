import { z } from "zod";
export const shippingFormSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  addressLine1: z
    .string()
    .min(5, "Address Line 1 must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z
    .string()
    .min(4, "Postal Code must be at least 4 characters")
    .regex(/^\d+$/, "Phone Number must contain only digits"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(7, "Phone Number must be at least 7 characters")
    .max(10, "Phone Number must be at most 15 characters")
    .regex(/^\d+$/, "Phone Number must contain only digits"),
  email: z.email("Invalid email address"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(2, "hard Holder must be at least 2 characters"),
  cardNumber: z
    .string()
    .min(16, "Card Number must be 16 characters")
    .max(16, "Card Number must be 16 characters")
    .regex(/^\d+$/, "Card Number must contain only digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiration Date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 characters")
    .max(4, "CVV must be at most 4 characters")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

export type paymentFormInputs = z.infer<typeof paymentFormSchema>;
