import { clientsService } from "@/services/clientsService";
import { plansService } from "@/services/plansService";
import { subscriptionService } from "@/services/subscriptionsService";
import type { Client } from "@/types/clientTypes";
import type { Plan } from "@/types/plansTypes";
import type { SubscriptionDetails } from "@/types/subscriptions";
import React from "react";
import { toast } from "sonner";

type FinanceContextType = {
  subscriptions: SubscriptionDetails[];
  clients: Client[];
  plans: Plan[];
  openModal: {
    createClient: boolean;
    createPlan: boolean;
    createSubscription: boolean;
  };
  client: Client | null;
  openClientModal: boolean;
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
  handleUpdateClients: (args: {
    id: number;
    name: string;
    email: string;
  }) => Promise<void>;
  handleCloseModal: (
    modalName:
      | "createClient"
      | "createPlan"
      | "createSubscription"
  ) => void;
  handleOpenModal: (
    modalName:
      | "createClient"
      | "createPlan"
      | "createSubscription"
  ) => void;
  handleOpenModalClient: (client: Client) => void;
  handleCloseModalClient: () => void;
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
  client: null,
  openClientModal: false,
  setClients: () => {},
  setPlans: () => {},
  setSubscriptions: () => {},
  setOpenModal: () => {},
  handleGetClients: async () => {},
  handleGetSubscriptions: async () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleGetPlans: async () => {},
  handleUpdateClients: async () => {},
  handleOpenModalClient: () => {},
  handleCloseModalClient: () => {},
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
  const[client, setClient] = React.useState<Client>({
    id: 0,
    name: "",
    email: "",
  });
  const [openClientModal, setOpenClientModal] = React.useState(false);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = React.useState<
    SubscriptionDetails[]
  >([]);
  const [openModal, setOpenModal] = React.useState({
    createClient: false,
    createPlan: false,
    createSubscription: false,
  });

  function handleOpenModalClient(client: Client) {
    setOpenClientModal(true);
    setClient({
      id: client.id,
      name: client.name,
      email: client.email,
    });
  }

  function handleCloseModalClient() {
    setOpenClientModal(false);
    setClient({
      id: 0,
      name: "",
      email: "",
    });
  }

  async function handleGetClients() {
    try {
      const data = await clientsService.getClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  async function handleUpdateClients({
    id,
    name,
    email,
  }: {
    id: number;
    name: string;
    email: string;
  }) {
    try {
      const updatedClient = await clientsService.updateClient(id, name, email);
      setClients((prevClients) =>
        prevClients.map((c) => (c.id === id ? updatedClient : c)),
      );
    } catch (error) {
      console.error("Error updating clients:", error);
    }finally {
      handleCloseModalClient();
      toast.success("Client updated successfully!", {
        description: "The client information has been updated.",
      });
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
    modalName:
      | "createClient"
      | "createPlan"
      | "createSubscription"
  ) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  }

  function handleCloseModal(
    modalName:
      | "createClient"
      | "createPlan"
      | "createSubscription"
  ) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  }

  return (
    <FinanceContext.Provider
      value={{
        openClientModal,
        subscriptions,
        clients,
        plans,
        openModal,
        client,
        setClients,
        setPlans,
        setSubscriptions,
        setOpenModal,
        handleGetClients,
        handleGetSubscriptions,
        handleGetPlans,
        handleOpenModal,
        handleCloseModal,
        handleUpdateClients,
        handleOpenModalClient,
        handleCloseModalClient,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
