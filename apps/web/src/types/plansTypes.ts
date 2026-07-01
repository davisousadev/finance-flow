export interface Plan {
    id: number;
    name: string;
    price: number;
    interval: "monthly" | "yearly";
}