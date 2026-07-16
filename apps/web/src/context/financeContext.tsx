import { plansService } from "@/services/plansService";
import { subscriptionService } from "@/services/subscriptionsService";
import type { Client } from "@/types/clientTypes";
import type { Plan } from "@/types/plansTypes";
import type { SubscriptionDetails } from "@/types/subscriptions";
import React from "react";
import { toast } from "sonner";

type ModalName = "createClient" | "createPlan" | "createSubscription";

type FinanceContextType = {
  subscriptions: SubscriptionDetails[];
  plans: Plan[];
  openModal: {
    createClient: boolean;
    createPlan: boolean;
    createSubscription: boolean;
  };
  client: Client | null;
  editClientModal: boolean;
  deleteClientModal: boolean;
  loading: boolean;
  plan: Plan | null;
  editPlanModal: boolean;
  deletePlanModal: boolean;
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionDetails[]>>;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      createClient: boolean;
      createPlan: boolean;
      createSubscription: boolean;
    }>
  >;
  handleGetSubscriptions: () => Promise<void>;
  handleGetPlans: () => Promise<void>;
  handleCloseModal: (modalName: ModalName) => void;
  handleOpenModal: (modalName: ModalName) => void;
  handleOpenEditClientModal: (client: Client) => void;
  handleCloseEditClientModal: () => void;
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
  handleCloseDeleteClientModal: () => void;
  handleOpenDeleteClientModal: (client: Client) => void;
  handleOpenEditPlanModal: (plan: Plan) => void;
  handleCloseEditPlanModal: () => void;
  handleOpenDeletePlanModal: (plan: Plan) => void;
  handleCloseDeletePlanModal: () => void;
  handleUpdatePlans: (
    e: React.SubmitEvent<HTMLFormElement>,
    plan: Plan,
  ) => Promise<void>;
  handleDeletePlan: (planId: number) => Promise<void>;
};

const FinanceContext = React.createContext<FinanceContextType>({
  subscriptions: [],
  plans: [],
  openModal: {
    createClient: false,
    createPlan: false,
    createSubscription: false,
  },
  client: null,
  deleteClientModal: false,
  editClientModal: false,
  loading: false,
  plan: null,
  editPlanModal: false,
  deletePlanModal: false,
  setPlans: () => { },
  setSubscriptions: () => { },
  setOpenModal: () => { },
  handleGetSubscriptions: async () => { },
  handleOpenModal: () => { },
  handleCloseModal: () => { },
  handleGetPlans: async () => { },
  handleOpenEditClientModal: () => { },
  handleCloseEditClientModal: () => { },
  handleCreatePlan: async () => { },
  handleCreateSubscription: async () => { },
  handleCloseDeleteClientModal: () => { },
  handleOpenDeleteClientModal: () => { },
  handleOpenEditPlanModal: () => { },
  handleCloseEditPlanModal: () => { },
  handleOpenDeletePlanModal: () => { },
  handleCloseDeletePlanModal: () => { },
  handleUpdatePlans: async () => { },
  handleDeletePlan: async () => { },
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
  const [plans, setPlans] = React.useState<Plan[]>([]);
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
  const [loading, setLoading] = React.useState(false);
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

  async function handleUpdatePlans(
    e: React.SubmitEvent<HTMLFormElement>,
    plan: Plan,
  ) {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPlan = await plansService.updatePlan(plan);
      setPlans((prevPlans) =>
        prevPlans.map((p) => (p.id === plan.id ? updatedPlan : p)),
      );
      toast.success("Plan updated successfully!", {
        description: "The plan information has been updated.",
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error updating plan");
      }
    } finally {
      handleCloseEditPlanModal();
      setLoading(false);
    }
  }

  async function handleDeletePlan(planId: number) {
    setLoading(true);
    try {
      await plansService.deletePlan(planId);
      setPlans((prevPlans) => prevPlans.filter((p) => p.id !== planId));
      toast.success("Plan deleted successfully!", {
        description: "The plan has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting plan:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting plan");
      }
    } finally {
      handleCloseDeletePlanModal();
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
      if (!name.trim() || !price.trim()) {
        throw new Error("Name and price are required");
      }
      if (parseFloat(price) <= 0) {
        throw new Error("Price must be a positive number");
      }
      const newPlan = await plansService.createPlan({
        name,
        price: parseFloat(price),
        interval,
      });
      setPlans?.((prevPlans) => [...prevPlans, newPlan]);
      toast.success("Plan created successfully!");
    } catch (error) {
      console.error("Error creating plan:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating plan");
      }
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
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error fetching subscriptions");
      }
    } finally {
      setLoading(false);
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
        plans,
        openModal,
        client,
        loading,
        plan,
        editPlanModal,
        deletePlanModal,
        deleteClientModal,
        setPlans,
        setSubscriptions,
        setOpenModal,
        handleGetSubscriptions,
        handleGetPlans,
        handleOpenModal,
        handleCloseModal,
        handleOpenEditClientModal,
        handleCloseEditClientModal,
        handleCreatePlan,
        handleCreateSubscription,
        handleCloseDeleteClientModal,
        handleOpenDeleteClientModal,
        handleOpenEditPlanModal,
        handleCloseEditPlanModal,
        handleOpenDeletePlanModal,
        handleCloseDeletePlanModal,
        handleUpdatePlans,
        handleDeletePlan,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
