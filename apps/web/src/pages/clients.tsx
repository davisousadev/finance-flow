import { ModalEditClient } from "@/components/modals/modalEditClient";
import { TableClients } from "@/components/tables/tableClients";
import { useFinanceContext } from "@/context/financeContext";
import React from "react";

export function Clients() {
  const { handleGetClients } = useFinanceContext();

  React.useEffect(() => {
    handleGetClients();
  }, []);
  return (
    <>
      <section className="flex flex-col gap-8 p-12 py-12 h-full">
        <div className="flex flex-col gap-4 bg-neutral-950 p-6 rounded-lg max-h-128  *:overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-950">
          <h1 className="text-2xl font-bold text-primary-100">Clients</h1>
          <TableClients />
        </div>
      </section>
      <ModalEditClient />
    </>
  );
}
