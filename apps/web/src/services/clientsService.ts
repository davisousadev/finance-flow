export const clientsService = {
  async getClients() {
    const response = await fetch("http://localhost:3000/clients");
    const data = await response.json();

    if (!response.ok) {
      return [];
    }
    return data;
  },
};
