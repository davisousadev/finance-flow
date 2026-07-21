import { countActiveClients } from "@/helpers/dataCardsHelper";
import type { Subscription } from "@/types/subscriptions";

describe("Active Clients", () => {
    test("should count active clients correctly", () => {
        const subscriptions: Subscription[] = [
            { id: 1, clientId: 1, planId: 1, status: "active", createdAt: new Date() },
            { id: 2, clientId: 2, planId: 1, status: "expired", createdAt: new Date() },
            { id: 3, clientId: 3, planId: 2, status: "canceled", createdAt: new Date() },
        ];

        const activeClients = countActiveClients(subscriptions);

        expect(activeClients).toBe(2);
    });

    test("should return 0 when there are no subscriptions", () => {
        const subscriptions: Subscription[] = [
            { id: 1, clientId: 1, planId: 1, status: "canceled", createdAt: new Date() },
            { id: 2, clientId: 2, planId: 1, status: "canceled", createdAt: new Date() },
            { id: 3, clientId: 3, planId: 2, status: "canceled", createdAt: new Date() },
        ];

        const activeClients = countActiveClients(subscriptions);

        expect(activeClients).toBe(0);
    });
}); 