import type { Client } from "@/types/clientTypes";

type ClientMutationResponse = {
  message: string;
  body: Client;
};

export const clientsService = {
  async getClients(): Promise<Client[]> {
    const response = await fetch("http://localhost:3000/clients");
    const data = await response.json();

    if (!response.ok) {
      return [];
    }
    return data;
  },

  async createClient(client: Omit<Client, "id">): Promise<Client> {
    const response = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Failed to create client");
    }

    const data = (await response.json()) as ClientMutationResponse;
    return data.body;
  },

  async updateClient(id: number, name: string, email: string): Promise<Client> {
    const response = await fetch(`http://localhost:3000/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error("Failed to update client");
    }

    const data = (await response.json()) as ClientMutationResponse;
    return data.body;
  },
};
