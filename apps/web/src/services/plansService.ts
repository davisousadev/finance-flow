import { URL, type ApiResponse } from "@/api/api";
import type { Plan } from "@/types/plansTypes";

export const plansService = {
  async getPlans(): Promise<Plan[]> {
    const response = await fetch(`${URL}/plans`);
    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<Plan[]>;
      throw new Error(data?.message || "Failed to fetch plans");
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
      const data = (await response.json()) as ApiResponse<Plan>;
      throw new Error(data?.message || "Failed to create plan");
    }

    const data = (await response.json()) as ApiResponse<Plan>;
    return data.payload;
  },

  async updatePlan(plan: Plan): Promise<Plan> {
    const response = await fetch(`${URL}/plans/${plan.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: plan.name, price: plan.price, interval: plan.interval }),
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<Plan>;
      throw new Error(data?.message || "Failed to update plan");
    }

    const data = (await response.json()) as ApiResponse<Plan>;
    return data.payload;
  },

  async deletePlan(id: number): Promise<{ id: number }> {
    const response = await fetch(`${URL}/plans/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<{ id: number }>;
      throw new Error(data?.message || "Failed to delete plan");
    }

    const data = (await response.json()) as ApiResponse<{ id: number }>;
    return data.payload;
  },
};
