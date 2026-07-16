import { ModalDeleteClient } from "@/components/modals/modalDeleteClient";
import { ModalEditClient } from "@/components/modals/modalEditClient";
import { ModalCreateClient } from "@/components/modals/modalCreateClient";
import { TableClients } from "@/components/tables/tableClients";
import { useFinanceContext } from "@/context/financeContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export function Clients(): React.JSX.Element {
  const { handleOpenModal } = useFinanceContext();

  return (
    <>
      <section className="flex flex-col gap-8 p-12 py-12 h-full">
        <div className="flex flex-col gap-4 bg-neutral-950 p-6 rounded-lg max-h-128  *:overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-950">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-100">Clients</h1>
            <Button
              variant={"ghost"}
              onClick={() => handleOpenModal("createClient")}
            >
              <Plus />
              Add Client
            </Button>
          </div>
          <TableClients />
        </div>
      </section>
      <ModalCreateClient />
      <ModalEditClient />
      <ModalDeleteClient />
    </>
  );
}

