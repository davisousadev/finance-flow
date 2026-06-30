import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsInput } from "../schemas/clients.schemas";
import { clients, db } from "@finance-flow/models";

export const clientsController = {
  async createClient(
    request: FastifyRequest<{ Body: ClientsInput }>,
    reply: FastifyReply,
  ) {
    const { name, email } = request.body;

    const [newClient] = await db
      .insert(clients)
      .values({ name, email })
      .onConflictDoNothing({ target: clients.email })
      .returning();

    if (!newClient) {
      return reply.status(409).send({ message: "Client with this email already exists" });
    }

    return reply.status(201).send({ message: "Client created successfully", body: newClient });
  },
};
