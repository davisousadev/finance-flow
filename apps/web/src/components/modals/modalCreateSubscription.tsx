import React from "react";
import { toast } from "sonner";
import { ModalContainer } from "./modalContainer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { subscriptionService } from "@/services/subscriptionsService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFinanceContext } from "@/context/financeContext";

export function ModalCreateSubscription() {
  const [clientId, setClientId] = React.useState<number | undefined>(0);
  const [planId, setPlanId] = React.useState<number | undefined>(0);
  const [status, setStatus] = React.useState<"active" | "canceled" | "expired">(
    "active",
  );

  const { openModal, setOpenModal, setSubscriptions, handleCloseModal } = useFinanceContext();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
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
      const updatedSubscriptions = await subscriptionService.getSubscriptionDetails();
      setSubscriptions?.(updatedSubscriptions);
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setClientId(0);
      setPlanId(0);
      setStatus("active");
      setOpenModal((prevState) => ({ ...prevState, createSubscription: false }));
    }
  }

  return (
    <ModalContainer open={openModal.createSubscription}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-secondary-200">
            Add New Subscription
          </h3>
          <p className="text-primary-100 text-sm">
            Fill in the details to add a new subscription.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-primary-100 font-mono" htmlFor="clientId">
            Client ID
          </label>
          <Input
            id="clientId"
            placeholder="Client ID"
            className="text-primary-100"
            value={clientId}
            onChange={(e) => setClientId(Number(e.target.value))}
            required
          />
          <label className="text-primary-100 font-mono" htmlFor="planId">
            Plan ID
          </label>
          <Input
            id="planId"
            placeholder="Plan ID"
            className="text-primary-100"
            value={planId}
            onChange={(e) => setPlanId(Number(e.target.value))}
            required
          />
          <label className="text-primary-100 font-mono" htmlFor="status">
            Status
          </label>
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as "active" | "canceled" | "expired")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => handleCloseModal("createSubscription")}>
            Cancel
          </Button>
          <Button type="submit">Create Subscription</Button>
        </div>
      </form>
    </ModalContainer>
  );
}
