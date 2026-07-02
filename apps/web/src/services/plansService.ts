import type { Plan } from "@/types/plansTypes";

export const plansService = {
    async getPlans() {
        const response = await fetch("http://localhost:3000/plans");
        const data = await response.json();

        if (!response.ok) {
            return [];
        }
        return data;
    },

    async createPlan(plan: Omit<Plan, "id">) {
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

        return await response.json();
    },
}