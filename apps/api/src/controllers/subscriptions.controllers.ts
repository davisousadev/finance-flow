import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriptionInput } from "../schemas/subscriptions.schemas";
import { clients, db, eq, plans, subscriptions } from "@finance-flow/models";

export const subscriptionsController = {
  async createSubscription(
    req: FastifyRequest<{ Body: SubscriptionInput }>,
    res: FastifyReply,
  ) {
    const { clientId, planId, status } = req.body;

    const [newSubscription] = await db
      .insert(subscriptions)
      .values({ clientId, planId, status })
      .returning();

    return res
      .status(201)
      .send({
        message: "Subscription created successfully",
        payload: newSubscription,
      });
  },

  async getSubscriptions(_req: FastifyRequest, res: FastifyReply) {
    const allSubscriptions = await db.select().from(subscriptions);

    return res.status(200).send({ payload: allSubscriptions });
  },

  async getSubscriptionDetails(_req: FastifyRequest, res: FastifyReply) {
    const subscriptionDetails = await db
      .select({
        id: subscriptions.id,
        clientId: subscriptions.clientId,
        planId: subscriptions.planId,
        status: subscriptions.status,
        clientName: clients.name,
        clientEmail: clients.email,
        planName: plans.name,
        planPrice: plans.price,
        planInterval: plans.interval,
      })
      .from(subscriptions)
      .innerJoin(clients, eq(subscriptions.clientId, clients.id))
      .innerJoin(plans, eq(subscriptions.planId, plans.id));

    return res.status(200).send({ payload: subscriptionDetails });
  },
};
