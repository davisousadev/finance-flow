import type { Client } from "@/types/clientTypes";
import type { Plan } from "@/types/plansTypes";
import React from "react";

type ModalName = "createClient" | "createPlan" | "createSubscription";

type FinanceContextType = {
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
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      createClient: boolean;
      createPlan: boolean;
      createSubscription: boolean;
    }>
  >;
  handleCloseModal: (modalName: ModalName) => void;
  handleOpenModal: (modalName: ModalName) => void;
  handleOpenEditClientModal: (client: Client) => void;
  handleCloseEditClientModal: () => void;
  handleCloseDeleteClientModal: () => void;
  handleOpenDeleteClientModal: (client: Client) => void;
  handleOpenEditPlanModal: (plan: Plan) => void;
  handleCloseEditPlanModal: () => void;
  handleOpenDeletePlanModal: (plan: Plan) => void;
  handleCloseDeletePlanModal: () => void;
};

const FinanceContext = React.createContext<FinanceContextType>({
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
  setOpenModal: () => { },
  handleOpenModal: () => { },
  handleCloseModal: () => { },
  handleOpenEditClientModal: () => { },
  handleCloseEditClientModal: () => { },
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
        openModal,
        client,
        plan,
        editPlanModal,
        deletePlanModal,
        deleteClientModal,
        setOpenModal,
        handleOpenModal,
        handleCloseModal,
        handleOpenEditClientModal,
        handleCloseEditClientModal,
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
