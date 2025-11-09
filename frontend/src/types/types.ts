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
