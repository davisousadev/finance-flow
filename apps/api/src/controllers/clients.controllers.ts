import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsInput } from "../schemas/clients.schemas";
import { clients, eq, db } from "@finance-flow/models";

export const clientsController = {
  async createClient(
    request: FastifyRequest<{ Body: ClientsInput }>,
    reply: FastifyReply,
  ) {
    try {
      const { name, email } = request.body;

      const [newClient] = await db
        .insert(clients)
        .values({ name, email })
        .onConflictDoNothing({ target: clients.email })
        .returning();

      if (!newClient) {
        return reply.status(409).send({ message: "Client with this email already exists", payload: null });
      }

      return reply.status(201).send({ message: "Client created successfully", payload: newClient });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ message: "Internal server error while creating client", payload: null });
    }
  },

  async getClients(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const allClients = await db.select().from(clients);
      return reply.status(200).send({ payload: allClients });
    } catch (error) {
      _request.log.error(error);
      return reply.status(500).send({ message: "Internal server error while fetching clients", payload: null });
    }
  },

  async updateClient(
    request: FastifyRequest<{ Body: ClientsInput; Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { id } = request.params;
      const { name, email } = request.body;

      const [updatedClient] = await db
        .update(clients)
        .set({ name, email })
        .where(eq(clients.id, Number(id)))
        .returning();

      if (!updatedClient) {
        return reply.status(404).send({ message: "Client not found", payload: null });
      }

      return reply.status(200).send({ message: "Client updated successfully", payload: updatedClient });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ message: "Internal server error while updating client", payload: null });
    }
  },

  async deleteClient(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { id } = request.params;

      const deletedClients = await db
        .delete(clients)
        .where(eq(clients.id, Number(id)))
        .returning({ id: clients.id });

      if (deletedClients.length === 0) {
        return reply.status(404).send({ message: "Client not found", payload: null });
      }

      return reply.status(200).send({ message: "Client deleted successfully", payload: deletedClients[0] });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ message: "Internal server error while deleting client", payload: null });
    }
  },
};
