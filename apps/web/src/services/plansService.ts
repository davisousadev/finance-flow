export const plansService = {
    async getPlans() {
        const response = await fetch("http://localhost:3000/plans");
        const data = await response.json();

        if (!response.ok) {
            return [];
        }
        return data;
    }
}