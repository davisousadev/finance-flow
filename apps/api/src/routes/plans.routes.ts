import { FastifyInstance } from "fastify";
import { plansSchema } from "../schemas/plans.schemas";
import { plansController } from "../controllers/plans.controllers";

export async function plansRoutes(app: FastifyInstance) {
    app.post(
        "/plans",
        {
            schema: {
                body: plansSchema,
            },
        },
        plansController.createPlan,
    );

    app.get(
        "/plans",
        plansController.getPlans,
    );

    app.put(
        "/plans/:id",
        {
            schema: {
                body: plansSchema,
            },
        },
        plansController.updatePlan,
    );

    app.delete(
        "/plans/:id",
        plansController.deletePlan,
    );
}