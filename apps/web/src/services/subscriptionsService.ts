import { URL, type ApiResponse } from "@/api/api";
import type { Subscription, SubscriptionDetails } from "@/types/subscriptions";

export const subscriptionService = {
  async createSubscription(
    subscription: Omit<Subscription, "id" | "createdAt">,
  ): Promise<Subscription> {
    const response = await fetch(`${URL}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error("Failed to create subscription");
    }

    const data = (await response.json()) as ApiResponse<Subscription>;
    return data.payload;
  },

  async getSubscriptionDetails(): Promise<SubscriptionDetails[]> {
    const response = await fetch(`${URL}/subscriptions/details`);
    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as ApiResponse<SubscriptionDetails[]>;

    return data.payload;
  },
};
