import type { Plan } from "@/types/plansTypes";

type PlanMutationResponse = {
    message: string;
    body: Plan;
};

export const plansService = {
    async getPlans(): Promise<Plan[]> {
        const response = await fetch("http://localhost:3000/plans");
        const data = await response.json();

        if (!response.ok) {
            return [];
        }
        return data;
    },

    async createPlan(plan: Omit<Plan, "id">): Promise<Plan> {
        const response = await fetch("http://localhost:3000/plans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plan),
        });

        if (!response.ok) {
            throw new Error("Failed to create plan");
        }

        const data = (await response.json()) as PlanMutationResponse;
        return data.body;
    },
}