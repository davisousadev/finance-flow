import type { ApiResponse } from "@/api/api";
import type { Plan } from "@/types/plansTypes";

export const plansService = {
  async getPlans(): Promise<Plan[]> {
    const response = await fetch(`${URL}/plans`);
    if (!response.ok) {
      console.error("Failed to fetch plans");
      return [];
    }
    const data = (await response.json()) as ApiResponse<Plan[]>;

    return data.payload;
  },

  async createPlan(plan: Omit<Plan, "id">): Promise<Plan> {
    const response = await fetch(`${URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });

    if (!response.ok) {
      throw new Error("Failed to create plan");
    }

    const data = (await response.json()) as ApiResponse<Plan>;
    return data.payload;
  },
};
