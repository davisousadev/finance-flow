import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Subscription, SubscriptionDetails } from "@/types/subscriptions";
import { subscriptionService } from "@/services/subscriptionsService";
import { toast } from "sonner";

export const SUBSCRIPTIONS_QUERY_KEY = ["subscriptions"] as const;

export function useSubscriptionsQuery() {
    return useQuery<SubscriptionDetails[], Error>({
        queryKey: SUBSCRIPTIONS_QUERY_KEY,
        queryFn: subscriptionService.getSubscriptionDetails,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateSubscriptionMutation() {
    const queryClient = useQueryClient();

    return useMutation<Subscription, Error, Omit<Subscription, "id" | "createdAt">>({
        mutationFn: (subscription) => subscriptionService.createSubscription(subscription),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SUBSCRIPTIONS_QUERY_KEY });
            toast.success("Subscription created successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create subscription");
        },
    });
}