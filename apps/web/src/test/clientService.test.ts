import type { Client } from "@/types/clientTypes"
import { clientsService } from "@/services/clientsService"
import { URL } from "@/api/api"

describe("Client Service", () => {
    test("should return the list of clients when the request is successful", async () => {
        const mockClients: Client[] = [{
            id: 1,
            name: "Client 1",
            email: "[EMAIL_ADDRESS]"
        }, {
            id: 2,
            name: "Client 2",
            email: "[EMAIL_ADDRESS]"
        }]

        jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => ({ payload: mockClients })
        } as Response)

        const result = await clientsService.getClients();

        expect(globalThis.fetch).toHaveBeenCalledWith(`${URL}/clients`);
        expect(result).toEqual(mockClients);
    })
})