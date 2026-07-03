import { CheckIcon, GroupIcon, Plus, PrinterCheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./card";
import React from "react";
import { TableSubscriptions } from "./tableSubsciptions";
import { ModalCreateClient } from "./modals/modalCreateClient";
import { ModalCreatePlan } from "./modals/modalCreatePlan";
import { ModalCreateSubscription } from "./modals/modalCreateSubscription";
import { useFinanceContext } from "@/context/financeContext";

export function Home() {
 const { subscriptions, handleGetClients, handleGetPlans, handleGetSubscriptions, handleOpenModal } = useFinanceContext();

  const monthlyPrice = subscriptions.reduce(
    (total, subscription) => total + subscription.planPrice,
    0,
  );
  const activePlans = subscriptions.filter(
    (subscription) => subscription.status === "active",
  ).length;

  const activeClients = subscriptions.filter(
    (subscription) =>
      subscription.status === "active" || subscription.status === "expired",
  ).length;

  React.useEffect(() => {
    handleGetClients();
    handleGetPlans();
    handleGetSubscriptions();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-200 ">
              Dashboard Overview
            </h1>
            <p className="text-primary-100 mt-2 text-sm">
              Real-time performance metrics for October 2024
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant={"ghost"}
              onClick={() => handleOpenModal("createClient")}
            >
              <Plus />
              Add Client
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => handleOpenModal("createPlan")}
            >
              <Plus />
              Add Plan
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Card
            title="Active Clients"
            className="w-full"
            description="Number of active clients in October 2024"
            data={activeClients.toString()}
            icon={<GroupIcon className="font-bold text-primary-300" />}
          />
          <Card
            title="Active Plans"
            className="w-full"
            description="Number of active plans in October 2024"
            data={activePlans.toString()}
            icon={<CheckIcon className="font-bold text-secondary-300" />}
          />
          <Card
            title="Monthly Price"
            className="w-full"
            description="Total monthly revenue from active plans"
            data={monthlyPrice.toFixed(2)}
            icon={<PrinterCheckIcon className="font-bold text-yellow-300" />}
          />
        </div>
        <div className="flex flex-col gap-4 bg-neutral-950 p-6 rounded-lg max-h-128  *:overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-950">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-lg font-semibold text-secondary-200">
              Client Subscriptions
            </h3>
            <Button
              className="flex items-center gap-2 bg-primary-gradient-right p-4 rounded-xl"
              onClick={() => handleOpenModal("createSubscription")}
            >
              <Plus />
              Add Subscription
            </Button>
          </div>
          <TableSubscriptions subscriptions={subscriptions} />
        </div>
      </section>
      <ModalCreateClient/>
      <ModalCreatePlan/>
      <ModalCreateSubscription/>
    </>
  );
}
