import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message is too short").max(5000),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot must be empty
  token: z.string().min(1),
  elapsedMs: z.number().min(300), // simple bot guard
});
