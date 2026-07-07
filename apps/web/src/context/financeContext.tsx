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
  loading: boolean;
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
  handleUpdateClients: (e: React.SubmitEvent<HTMLFormElement>, args: {
    id: number;
    name: string;
    email: string;
  }) => Promise<void>;
  handleCloseModal: (
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) => void;
  handleOpenModal: (
    modalName: "createClient" | "createPlan" | "createSubscription",
  ) => void;
  handleOpenModalClient: (client: Client) => void;
  handleCloseModalClient: () => void;
  handleCreateClient: (
    event: React.SubmitEvent<HTMLFormElement>,
    name: string,
    email: string,
  ) => Promise<void>;
  handleCreatePlan: (
    event: React.SubmitEvent<HTMLFormElement>,
    name: string,
    price: string,
    interval: "monthly" | "yearly",
  ) => Promise<void>;
  handleCreateSubscription: (
    event: React.SubmitEvent<HTMLFormElement>,
    clientId: number,
    planId: number,
    status: "active" | "canceled" | "expired",
  ) => Promise<void>;
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
  loading: false,
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
  handleCreateClient: async () => {},
  handleCreatePlan: async () => {},
  handleCreateSubscription: async () => {},
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
  const [client, setClient] = React.useState<Client>({
    id: 0,
    name: "",
    email: "",
  });
  const [openClientModal, setOpenClientModal] = React.useState(false);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = React.useState<
    SubscriptionDetails[]
  >([]);
  const [loading, setLoading] = React.useState(false);
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
    setLoading(true);
    try {
      const data = await clientsService.getClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateClients(e: React.SubmitEvent<HTMLFormElement>, {
    id,
    name,
    email,
  }: {
    id: number;
    name: string;
    email: string;
  }) {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedClient = await clientsService.updateClient(id, name, email);
      setClients((prevClients) =>
        prevClients.map((c) => (c.id === id ? updatedClient : c)),
      );
    } catch (error) {
      console.error("Error updating clients:", error);
    } finally {
      setLoading(false);
      handleCloseModalClient();
      toast.success("Client updated successfully!", {
        description: "The client information has been updated.",
      });
    }
  }

  async function handleGetPlans() {
    setLoading(true);
    try {
      const data = await plansService.getPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateClient(
    event: React.SubmitEvent<HTMLFormElement>,
    name: string,
    email: string,
  ) {
    setLoading(true);
    event.preventDefault();
    try {
      if (!name || !email) {
        throw new Error("Name and email are required");
      }
      const createdClient = await clientsService.createClient({ name, email });
      setClients?.((prevClients) => [...prevClients, createdClient]);
      toast.success("Client created successfully!");
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setOpenModal((prevState) => ({ ...prevState, createClient: false }));
      setLoading(false);
    }
  }

  async function handleCreatePlan(
    event: React.SubmitEvent<HTMLFormElement>,
    name: string,
    price: string,
    interval: "monthly" | "yearly",
  ) {
    setLoading(true);
    event.preventDefault();
    try {
      if (!name || !price) {
        throw new Error("Name and price are required");
      }
      const newPlan = await plansService.createPlan({
        name,
        price: parseFloat(price),
        interval,
      });
      toast.success("Plan created successfully!");
      setPlans?.((prevPlans) => [...prevPlans, newPlan]);
    } catch (error) {
      console.error("Error creating plan:", error);
    } finally {
      setOpenModal((prevState) => ({ ...prevState, createPlan: false }));
      setLoading(false);
    }
  }

  async function handleCreateSubscription(
    event: React.SubmitEvent<HTMLFormElement>,
    clientId: number,
    planId: number,
    status: "active" | "canceled" | "expired",
  ) {
    setLoading(true);
    event.preventDefault();
    try {
      if (!clientId || !planId) {
        throw new Error("Client and plan are required");
      }
      await subscriptionService.createSubscription({
        clientId,
        planId,
        status,
      });
      toast.success("Subscription created successfully!");
      const updatedSubscriptions =
        await subscriptionService.getSubscriptionDetails();
      setSubscriptions?.(updatedSubscriptions);
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setOpenModal((prevState) => ({
        ...prevState,
        createSubscription: false,
      }));
      setLoading(false);
    }
  }

  async function handleGetSubscriptions() {
    setLoading(true);
    try {
      const data = await subscriptionService.getSubscriptionDetails();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
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
        openClientModal,
        subscriptions,
        clients,
        plans,
        openModal,
        client,
        loading,
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
        handleCreateClient,
        handleCreatePlan,
        handleCreateSubscription,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
