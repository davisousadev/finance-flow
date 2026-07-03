import z from "zod";

export const subscriptionSchema = z.object({
  clientId: z.number().min(1, "Client ID is required"),
  planId: z.number().min(1, "Plan ID is required"),
  status: z.enum(["active", "canceled", "expired"]).default("active"),
  createdAt: z.date().default(() => new Date()),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;