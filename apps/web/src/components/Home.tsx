import { CheckIcon, GroupIcon, Plus, PrinterCheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./card";
import React from "react";
import { plansService } from "@/services/plansService";
import { clientsService } from "@/services/clientsService";
import type { Plan } from "@/types/plansTypes";
import type { Client } from "@/types/clientTypes";
import { TableClients } from "./tableClients";

export function Home() {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);

  async function handleGetClients() {
    try {
      const data = await clientsService.getClients();
      setClients(data);
      console.log("Clients fetched:", data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  async function handleGetPlans() {
    try {
      const data = await plansService.getPlans();
      setPlans(data);
      console.log("Plans fetched:", data.length);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }

  React.useEffect(() => {
    handleGetClients();
    handleGetPlans();
  }, []);
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-100 ">
            Dashboard Overview
          </h1>
          <p className="text-primary-100 mt-2 text-sm">
            Real-time performance metrics for October 2024
          </p>
        </div>
        <Button className="flex items-center bg-primary-gradient-right gap-2 p-4 font-bold ">
          <Plus />
          Add Subscription
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Card
          title="Total Clients"
          className="w-full"
          description="Number of active clients in October 2024"
          data={clients.length.toString()}
          icon={<GroupIcon className="font-bold text-primary-300" />}
        />
        <Card
          title="Active Plans"
          className="w-full"
          description="Number of active plans in October 2024"
          data={plans.length.toString()}
          icon={<CheckIcon className="font-bold text-secondary-300" />}
        />
        <Card
          title="Monthly Price"
          className="w-full"
          description="Total monthly revenue from active plans"
          data={plans
            .reduce((sum, plan) => sum + (plan?.price || 0), 0)
            .toString()}
          icon={<PrinterCheckIcon className="font-bold text-yellow-300" />}
        />
      </div>
      <div className="flex flex-col gap-4 bg-neutral-950 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-secondary-200">
          Client Subscriptions
        </h3>
        <TableClients clients={clients} />
      </div>
    </section>
  );
}
