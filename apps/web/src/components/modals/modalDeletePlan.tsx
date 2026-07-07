import { useFinanceContext } from "@/context/financeContext";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";

export function ModalDeletePlan() {
  const {
    handleCloseDeletePlanModal,
    deletePlanModal,
    plan,
    handleDeletePlan,
    loading,
  } = useFinanceContext();
  return (
    <ModalContainer open={deletePlanModal}>
      <div>
        <h3 className="text-lg font-semibold">Delete Plan</h3>
        <p className="text-sm text-secondary-200">
          Are you sure you want to delete{" "}
          <span className="font-bold">{plan?.name}</span>? This action cannot
          be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() => handleCloseDeletePlanModal()}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeletePlan(plan?.id || 0)}
            disabled={!plan || loading}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
