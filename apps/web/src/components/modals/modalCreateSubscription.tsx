import { ModalContainer } from "./modalContainer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFinanceContext } from "@/context/financeContext";
import { LoaderIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCreateSubscriptionMutation } from "@/hooks/useSubscriptionsQuery";
import { useForm } from "react-hook-form";
import type { Subscription } from "@/types/subscriptions";

export function ModalCreateSubscription() {

  const { mutate, isPending } = useCreateSubscriptionMutation()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Subscription, "id" | "createdAt">>({
    defaultValues: {
      clientId: 0,
      planId: 0,
      status: "active"
    }
  })

  const { openModal, handleCloseModal } = useFinanceContext();

  const handleCreateSubscription = (formData: Omit<Subscription, "id" | "createdAt">) => {
    const clientId = Number(formData.clientId)
    const planId = Number(formData.planId)

    mutate({ ...formData, clientId, planId }, {
      onSuccess: () => {
        handleCloseModal("createSubscription")
        reset()
      }
    })
  }

  return (
    <ModalContainer open={openModal.createSubscription}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleSubmit(handleCreateSubscription)}
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
            type="number"
            placeholder="Client ID"
            className="text-primary-100"
            {...register("clientId", {
              required: "Client ID is required"
            })}
            disabled={isPending}
          />
          {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId.message}</p>}
          <label className="text-primary-100 font-mono" htmlFor="planId">
            Plan ID
          </label>
          <Input
            id="planId"
            type="number"
            placeholder="Plan ID"
            className="text-primary-100"
            {...register("planId", {
              required: "Plan ID is required"
            })}
            disabled={isPending}
          />
          {errors.planId && <p className="text-red-500 text-sm">{errors.planId.message}</p>}
          <label className="text-primary-100 font-mono" htmlFor="status">
            Status
          </label>
          <Select
            {...register("status", {
              required: "Status is required"
            })}
            disabled={isPending}
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
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleCloseModal("createSubscription")}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderIcon className="animate-spin" /> : "Create Subscription"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
