import { FastifyInstance } from "fastify";
import { subscriptionSchema } from "../schemas/subscriptions.schemas";
import { subscriptionsController } from "../controllers/subscriptions.controllers";

export function subscriptionRoute(app: FastifyInstance) {
  app.post(
    "/subscriptions",
    {
      schema: {
        body: subscriptionSchema,
      },
    },
    subscriptionsController.createSubscription,
  );

  app.get("/subscriptions", subscriptionsController.getSubscriptions);

  app.get("/subscriptions/details", subscriptionsController.getSubscriptionDetails);
}
