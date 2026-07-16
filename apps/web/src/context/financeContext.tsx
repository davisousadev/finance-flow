import { subscriptionService } from "@/services/subscriptionsService";
import type { Client } from "@/types/clientTypes";
import type { Plan } from "@/types/plansTypes";
import type { SubscriptionDetails } from "@/types/subscriptions";
import React from "react";
import { toast } from "sonner";

type ModalName = "createClient" | "createPlan" | "createSubscription";

type FinanceContextType = {
  subscriptions: SubscriptionDetails[];
  openModal: {
    createClient: boolean;
    createPlan: boolean;
    createSubscription: boolean;
  };
  client: Client | null;
  editClientModal: boolean;
  deleteClientModal: boolean;
  plan: Plan | null;
  editPlanModal: boolean;
  deletePlanModal: boolean;
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionDetails[]>>;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      createClient: boolean;
      createPlan: boolean;
      createSubscription: boolean;
    }>
  >;
  handleGetSubscriptions: () => Promise<void>;
  handleCloseModal: (modalName: ModalName) => void;
  handleOpenModal: (modalName: ModalName) => void;
  handleOpenEditClientModal: (client: Client) => void;
  handleCloseEditClientModal: () => void;
  handleCreateSubscription: (
    event: React.SubmitEvent<HTMLFormElement>,
    clientId: number,
    planId: number,
    status: "active" | "canceled" | "expired",
  ) => Promise<void>;
  handleCloseDeleteClientModal: () => void;
  handleOpenDeleteClientModal: (client: Client) => void;
  handleOpenEditPlanModal: (plan: Plan) => void;
  handleCloseEditPlanModal: () => void;
  handleOpenDeletePlanModal: (plan: Plan) => void;
  handleCloseDeletePlanModal: () => void;
};

const FinanceContext = React.createContext<FinanceContextType>({
  subscriptions: [],
  openModal: {
    createClient: false,
    createPlan: false,
    createSubscription: false,
  },
  client: null,
  deleteClientModal: false,
  editClientModal: false,
  plan: null,
  editPlanModal: false,
  deletePlanModal: false,
  setSubscriptions: () => { },
  setOpenModal: () => { },
  handleGetSubscriptions: async () => { },
  handleOpenModal: () => { },
  handleCloseModal: () => { },
  handleOpenEditClientModal: () => { },
  handleCloseEditClientModal: () => { },
  handleCreateSubscription: async () => { },
  handleCloseDeleteClientModal: () => { },
  handleOpenDeleteClientModal: () => { },
  handleOpenEditPlanModal: () => { },
  handleCloseEditPlanModal: () => { },
  handleOpenDeletePlanModal: () => { },
  handleCloseDeletePlanModal: () => { },
});

export function useFinanceContext() {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinanceContext must be used within a FinanceProvider");
  }
  return context;
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = React.useState<Client>({
    id: 0,
    name: "",
    email: "",
  });
  const [editClientModal, setEditClientModal] = React.useState(false);
  const [deleteClientModal, setDeleteClientModal] = React.useState(false);
  const [plan, setPlan] = React.useState<Plan>({
    id: 0,
    name: "",
    price: 0,
    interval: "monthly",
  });
  const [editPlanModal, setEditPlanModal] = React.useState(false);
  const [deletePlanModal, setDeletePlanModal] = React.useState(false);
  const [subscriptions, setSubscriptions] = React.useState<
    SubscriptionDetails[]
  >([]);
  const [openModal, setOpenModal] = React.useState({
    createClient: false,
    createPlan: false,
    createSubscription: false,
  });

  function handleOpenEditClientModal(client: Client) {
    setEditClientModal(true);
    setClient(client);
  }

  function handleCloseEditClientModal() {
    setEditClientModal(false);
    setClient({
      id: 0,
      name: "",
      email: "",
    });
  }

  function handleCloseDeleteClientModal() {
    setDeleteClientModal(false);
    setClient({
      id: 0,
      name: "",
      email: "",
    });
  }

  function handleOpenDeleteClientModal(client: Client) {
    setDeleteClientModal(true);
    setClient(client);
  }

  function handleOpenEditPlanModal(plan: Plan) {
    setEditPlanModal(true);
    setPlan(plan);
  }

  function handleOpenDeletePlanModal(plan: Plan) {
    setDeletePlanModal(true);
    setPlan(plan);
  }

  function handleCloseEditPlanModal() {
    setEditPlanModal(false);
    setPlan({
      id: 0,
      name: "",
      price: 0,
      interval: "monthly",
    });
  }

  function handleCloseDeletePlanModal() {
    setDeletePlanModal(false);
    setPlan({
      id: 0,
      name: "",
      price: 0,
      interval: "monthly",
    });
  }

  async function handleCreateSubscription(
    event: React.SubmitEvent<HTMLFormElement>,
    clientId: number,
    planId: number,
    status: "active" | "canceled" | "expired",
  ) {
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
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating subscription");
      }
    } finally {
      setOpenModal((prevState) => ({
        ...prevState,
        createSubscription: false,
      }));
    }
  }

  async function handleGetSubscriptions() {
    try {
      const data = await subscriptionService.getSubscriptionDetails();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error fetching subscriptions");
      }
    }
  }

  function handleOpenModal(modalName: ModalName) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  }

  function handleCloseModal(modalName: ModalName) {
    setOpenModal((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  }

  return (
    <FinanceContext.Provider
      value={{
        editClientModal,
        subscriptions,
        openModal,
        client,
        plan,
        editPlanModal,
        deletePlanModal,
        deleteClientModal,
        setSubscriptions,
        setOpenModal,
        handleGetSubscriptions,
        handleOpenModal,
        handleCloseModal,
        handleOpenEditClientModal,
        handleCloseEditClientModal,
        handleCreateSubscription,
        handleCloseDeleteClientModal,
        handleOpenDeleteClientModal,
        handleOpenEditPlanModal,
        handleCloseEditPlanModal,
        handleOpenDeletePlanModal,
        handleCloseDeletePlanModal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
