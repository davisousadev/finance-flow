import z from "zod";

export const clientsSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }).trim(),
});

export type ClientsInput = z.infer<typeof clientsSchema>;