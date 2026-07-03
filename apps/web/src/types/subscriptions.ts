export type Subscription = {
    id: number;
    clientId: number;
    planId: number;
    status: "active" | "canceled" | "expired";
    createdAt: Date;
}

export type SubscriptionDetails = {
    clientName: string;
    clientEmail: string;
    planName: string;
    planPrice: number;
    planInterval: "monthly" | "yearly";
} & Subscription;