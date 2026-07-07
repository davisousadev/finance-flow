import { useFinanceContext } from "@/context/financeContext";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";

export function ModalDeleteClient() {
  const {
    handleCloseDeleteClientModal,
    deleteClientModal,
    client,
    handleDeleteClient,
    loading,
  } = useFinanceContext();
  return (
    <ModalContainer open={deleteClientModal}>
      <div>
        <h3 className="text-lg font-semibold">Delete Client</h3>
        <p className="text-sm text-secondary-200">
          Are you sure you want to delete{" "}
          <span className="font-bold">{client?.name}</span>? This action cannot
          be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() => handleCloseDeleteClientModal()}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteClient(client?.id || 0)}
            disabled={!client || loading}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
