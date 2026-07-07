import { FastifyReply, FastifyRequest } from "fastify";
import { PlansInput } from "../schemas/plans.schemas";
import { db, eq, plans } from "@finance-flow/models";

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

    return res.status(201).send({ message: "Plan created successfully", payload: newPlan });
  },

  async getPlans(_req: FastifyRequest, res: FastifyReply) {
    const allPlans = await db.select().from(plans);

    return res.status(200).send({ payload: allPlans });
  },

  async updatePlan(
    req: FastifyRequest<{ Body: PlansInput; Params: { id: string } }>,
    res: FastifyReply,
  ) {
    const { id } = req.params;
    const { name, price, interval } = req.body;

    const [updatedPlan] = await db
      .update(plans)
      .set({ name, price, interval })
      .where(eq(plans.id, Number(id)))
      .returning();

    if (!updatedPlan) {
      return res.status(404).send({ message: "Plan not found", payload: null });
    }

    return res.status(200).send({ message: "Plan updated successfully", payload: updatedPlan });
  },
  
  async deletePlan(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply,
  ) {
    const { id } = req.params;  

    const deletedPlan = await db
      .delete(plans)
      .where(eq(plans.id, Number(id)))
      .returning({ id: plans.id });

    if (deletedPlan.length === 0) {
      return res.status(404).send({ message: "Plan not found", payload: null });
    }

    return res.status(200).send({ message: "Plan deleted successfully", payload: deletedPlan[0] });
  },

};
