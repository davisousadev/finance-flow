import type { Subscription, SubscriptionDetails } from "@/types/subscriptions";

type SubscriptionMutationResponse = {
    message: string;
    body: Subscription;
};

export const subscriptionService = {
    async createSubscription(subscription: Omit<Subscription, "id" | "createdAt">): Promise<Subscription> {
        const response = await fetch("http://localhost:3000/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
        });

        if (!response.ok) {
            throw new Error("Failed to create subscription");
        }

        const data = (await response.json()) as SubscriptionMutationResponse;
        return data.body;
    },

    async getSubscriptionDetails(): Promise<SubscriptionDetails[]> {
        const response = await fetch("http://localhost:3000/subscriptions/details");
        const data = await response.json();

        if (!response.ok) {
            return [];
        }
        return data;
    }
}