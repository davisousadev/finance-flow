import z from "zod";

export const plansSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    price: z.number().int().positive({ message: "Price must be a positive integer" }),
    interval: z.enum(["monthly", "yearly"], {
        message: "Interval is required",
    }),
});

export type PlansInput = z.infer<typeof plansSchema>;