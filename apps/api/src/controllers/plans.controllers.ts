import { FastifyReply, FastifyRequest } from "fastify";
import { PlansInput } from "../schemas/plans.schemas";
import { db, plans } from "@finance-flow/models";

export const plansController = {
  async createPlan(
    req: FastifyRequest<{ Body: PlansInput }>,
    res: FastifyReply,
  ) {
    const { name, price, interval } = req.body;

    const [newPlan] = await db
      .insert(plans)
      .values({ name, price, interval })
      .returning();

    return res.status(201).send({ message: "Plan created successfully", body: newPlan });
  },

  async getPlans(_req: FastifyRequest, res: FastifyReply) {
    const allPlans = await db.select().from(plans);

    return res.status(200).send( allPlans );
  }
};
