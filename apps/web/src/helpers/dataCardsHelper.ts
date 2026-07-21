import type { Subscription, SubscriptionDetails } from "@/types/subscriptions";

export function calculateMonthlyPrice(
  subscriptions: SubscriptionDetails[],
): number {
  return subscriptions.reduce(
    (total, subscription) => total + subscription.planPrice,
    0,
  );
}

export function countActivePlans(subscriptions: SubscriptionDetails[]): number {
  return subscriptions.filter(
    (subscription) => subscription.status === "active",
  ).length;
}

export function countActiveClients(subscriptions: Subscription[]): number {
  return subscriptions.filter(
    (subscription) =>
      subscription.status === "active" || subscription.status === "expired",
  ).length;
}
