import { URL, type ApiResponse } from "@/api/api";
import type { Client } from "@/types/clientTypes";

export const clientsService = {
  async getClients(): Promise<Client[]> {
    const response = await fetch(`${URL}/clients`);
    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<Client[]>;
      throw new Error(data?.message || "Failed to fetch clients");
    }

    const data = (await response.json()) as ApiResponse<Client[]>;

    return data.payload;
  },

  async createClient(client: Omit<Client, "id">): Promise<Client> {
    const response = await fetch(`${URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<Client>;
      throw new Error(data?.message || "Failed to create client");
    }

    const data = (await response.json()) as ApiResponse<Client>;
    return data.payload;
  },

  async updateClient(client: Client): Promise<Client> {
    const response = await fetch(`${URL}/clients/${client.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: client.name, email: client.email }),
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<Client>;
      throw new Error(data?.message || "Failed to update client");
    }

    const data = (await response.json()) as ApiResponse<Client>;

    return data.payload;
  },

  async deleteClient(id: number): Promise<{ id: number }> {
    const response = await fetch(`${URL}/clients/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiResponse<{ id: number }>;
      throw new Error(data?.message || "Failed to delete client");
    }

    const data = (await response.json()) as ApiResponse<{ id: number }>;
    return data.payload;
  },
};
