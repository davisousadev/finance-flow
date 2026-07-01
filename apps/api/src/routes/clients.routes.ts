import { FastifyInstance } from "fastify";
import { clientsSchema } from "../schemas/clients.schemas";
import { clientsController } from "../controllers/clients.controllers";

export async function clientsRoutes(app: FastifyInstance) {
  app.post(
    "/clients",
    {
      schema: {
        body: clientsSchema,
      },
    },
    clientsController.createClient,
  );

  app.get("/clients", clientsController.getClients);
}
