import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsInput } from "../schemas/clients.schemas";
import { clients, eq, db } from "@finance-flow/models";

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

    return reply.status(201).send({ message: "Client created successfully", payload: newClient });
  },

  async getClients(_request: FastifyRequest, reply: FastifyReply) {
    const allClients = await db.select().from(clients);
    return reply.status(200).send({ data: allClients });
  },

  async updateClient(
    request: FastifyRequest<{ Body: ClientsInput; Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { name, email } = request.body;

    const [updatedClient] = await db
      .update(clients)
      .set({ name, email })
      .where(eq(clients.id, Number(id)))
      .returning();

    if (!updatedClient) {
      return reply.status(404).send({ message: "Client not found" });
    }

    return reply.status(200).send({ message: "Client updated successfully", payload: updatedClient });
  },

  async deleteClient(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    const deletedClients = await db
      .delete(clients)
      .where(eq(clients.id, Number(id)))
      .returning({ id: clients.id });

    if (deletedClients.length === 0) {
      return reply.status(404).send({ message: "Client not found" });
    }

    return reply.status(200).send({ message: "Client deleted successfully", payload: { id } });
  },
};
