import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { plansService } from "@/services/plansService";
import type { Plan } from "@/types/plansTypes";
import { toast } from "sonner";

export const PLANS_QUERY_KEY = ["plans"] as const;

export function usePlansQuery() {
    return useQuery<Plan[], Error>({
        queryKey: PLANS_QUERY_KEY,
        queryFn: plansService.getPlans,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreatePlanMutation() {
    const queryClient = useQueryClient();

    return useMutation<Plan, Error, Omit<Plan, "id">>({
        mutationFn: (plan) => plansService.createPlan(plan),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
            toast.success("Plan created successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create plan");
        },
    });
}

export function useUpdatePlanMutation() {
    const queryClient = useQueryClient();

    return useMutation<Plan, Error, Plan>({
        mutationFn: (plan) => plansService.updatePlan(plan),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
            toast.success("Plan updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update plan");
        },
    });
}

export function useDeletePlanMutation() {
    const queryClient = useQueryClient();

    return useMutation<{ id: number }, Error, number>({
        mutationFn: plansService.deletePlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
            toast.success("Plan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete plan");
        },
    });
}
