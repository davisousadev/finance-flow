import { Card } from "@/components/card";
import { ModalCreateClient } from "@/components/modals/modalCreateClient";
import { ModalCreatePlan } from "@/components/modals/modalCreatePlan";
import { ModalCreateSubscription } from "@/components/modals/modalCreateSubscription";
import { TableSubscriptions } from "@/components/tables/tableSubsciptions";
import { Button } from "@/components/ui/button";
import { useFinanceContext } from "@/context/financeContext";
import { calculateMonthlyPrice, countActiveClients, countActivePlans } from "@/helpers/dataCardsHelper";
import { useSubscriptionsQuery } from "@/hooks/useSubscriptionsQuery";
import { ChartCandlestick, CheckIcon, Plus, UserRoundCheck } from "lucide-react";
import { useMemo } from "react";

export function Home() {
  const { data: subscriptions = [] } = useSubscriptionsQuery();
  const { handleOpenModal } = useFinanceContext();

  const monthlyPrice = useMemo(() => calculateMonthlyPrice(subscriptions), [subscriptions]);
  const activePlans = useMemo(() => countActivePlans(subscriptions), [subscriptions]);
  const activeClients = useMemo(() => countActiveClients(subscriptions), [subscriptions])

  return (
    <>
      <section className="flex flex-col gap-8 p-12 py-12">
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
            data={activeClients.toString() || "0"}
            icon={<UserRoundCheck className="font-bold text-primary-300" />}
          />
          <Card
            title="Active Plans"
            className="w-full"
            description="Number of active plans in October 2024"
            data={activePlans.toString() || "0"}
            icon={<CheckIcon className="font-bold text-secondary-300" />}
          />
          <Card
            title="Monthly Price"
            className="w-full"
            description="Total monthly revenue from active plans"
            data={monthlyPrice.toFixed(2) || "0.00"}
            icon={<ChartCandlestick className="font-bold text-yellow-300" />}
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
          <TableSubscriptions />
        </div>
      </section>
      <ModalCreateClient />
      <ModalCreatePlan />
      <ModalCreateSubscription />
    </>
  );
}
