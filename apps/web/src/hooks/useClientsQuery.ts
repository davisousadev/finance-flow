import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsService } from "@/services/clientsService";
import type { Client } from "@/types/clientTypes";
import { toast } from "sonner";

export const CLIENTS_QUERY_KEY = ["clients"] as const;

export function useClientsQuery() {
    return useQuery<Client[], Error>({
        queryKey: CLIENTS_QUERY_KEY,
        queryFn: clientsService.getClients,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateClientMutation() {
    const queryClient = useQueryClient();

    return useMutation<Client, Error, Omit<Client, "id">>({
        mutationFn: (client) => clientsService.createClient(client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
            toast.success("Client created successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create client");
        },
    });
}

export function useUpdateClientMutation() {
    const queryClient = useQueryClient();

    return useMutation<Client, Error, Client>({
        mutationFn: (client) => clientsService.updateClient(client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
            toast.success("Client updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update client");
        },
    });
}

export function useDeleteClientMutation() {
    const queryClient = useQueryClient();

    return useMutation<{ id: number }, Error, number>({
        mutationFn: clientsService.deleteClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
            toast.success("Client deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete client");
        },
    });
}
