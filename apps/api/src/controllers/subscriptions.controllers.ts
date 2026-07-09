import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriptionInput } from "../schemas/subscriptions.schemas";
import { clients, db, eq, plans, subscriptions } from "@finance-flow/models";

export const subscriptionsController = {
  async createSubscription(
    req: FastifyRequest<{ Body: SubscriptionInput }>,
    res: FastifyReply,
  ) {
    try {
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
    } catch (error) {
      req.log.error(error);
      return res.status(500).send({ message: "Internal server error while creating subscription", payload: null });
    }
  },

  async getSubscriptions(_req: FastifyRequest, res: FastifyReply) {
    try {
      const allSubscriptions = await db.select().from(subscriptions);

      return res.status(200).send({ payload: allSubscriptions });
    } catch (error) {
      _req.log.error(error);
      return res.status(500).send({ message: "Internal server error while fetching subscriptions", payload: null });
    }
  },

  async getSubscriptionDetails(_req: FastifyRequest, res: FastifyReply) {
    try {
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
    } catch (error) {
      _req.log.error(error);
      return res.status(500).send({ message: "Internal server error while fetching subscription details", payload: null });
    }
  },
};
