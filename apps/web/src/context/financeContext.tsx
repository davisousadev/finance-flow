import { clientsService } from "@/services/clientsService";
import { plansService } from "@/services/plansService";
import { subscriptionService } from "@/services/subscriptionsService";
import type { Client } from "@/types/clientTypes";
import type { Plan } from "@/types/plansTypes";
import type { SubscriptionDetails } from "@/types/subscriptions";
import React from "react";

type FinanceContextType = {
  subscriptions: SubscriptionDetails[];
  clients: Client[];
  plans: Plan[];
  openModal: {
    createClient: boolean;
    createPlan: boolean;
    createSubscription: boolean;
  };
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionDetails[]>>;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      createClient: boolean;
      createPlan: boolean;
      createSubscription: boolean;
    }>
  >;
  handleGetClients: () => Promise<void>;
  handleGetSubscriptions: () => Promise<void>;
  handleGetPlans: () => Promise<void>;
  handleCloseModal: (
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) => void;
  handleOpenModal: (
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) => void;
};

const FinanceContext = React.createContext<FinanceContextType>({
  subscriptions: [],
  clients: [],
  plans: [],
  openModal: {
    createClient: false,
    createPlan: false,
    createSubscription: false,
  },
  setClients: () => {},
  setPlans: () => {},
  setSubscriptions: () => {},
  setOpenModal: () => {},
  handleGetClients: async () => {},
  handleGetSubscriptions: async () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleGetPlans: async () => {},
});

export function useFinanceContext() {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinanceContext must be used within a FinanceProvider");
  }
  return context;
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = React.useState<
    SubscriptionDetails[]
  >([]);
  const [openModal, setOpenModal] = React.useState({
    createClient: false,
    createPlan: false,
    createSubscription: false,
  });

  async function handleGetClients() {
    try {
      const data = await clientsService.getClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  async function handleGetPlans() {
    try {
      const data = await plansService.getPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }

  async function handleGetSubscriptions() {
    try {
      const data = await subscriptionService.getSubscriptionDetails();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  }

  function handleOpenModal(
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  }

  function handleCloseModal(
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  }

  return (
    <FinanceContext.Provider
      value={{
        subscriptions,
        clients,
        plans,
        openModal,
        setClients,
        setPlans,
        setSubscriptions,
        setOpenModal,
        handleGetClients,
        handleGetSubscriptions,
        handleGetPlans,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
