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

  app.put(
    "/clients/:id",
    {
      schema: {
        body: clientsSchema,
      },
    },
    clientsController.updateClient,
  );

  app.delete("/clients/:id", clientsController.deleteClient);
}
