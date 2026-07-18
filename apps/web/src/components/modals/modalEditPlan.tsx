import { useFinanceContext } from "@/context/financeContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUpdatePlanMutation } from "@/hooks/usePlansQuery";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { Plan } from "@/types/plansTypes";

export function ModalEditPlan() {
  const { mutate, isPending } = useUpdatePlanMutation()

  const { handleCloseEditPlanModal, editPlanModal, plan } = useFinanceContext();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Plan, "id">>({
    defaultValues: {
      name: plan?.name || "",
      price: plan?.price || 0,
      interval: plan?.interval || "monthly",
    }
  })

  const handleUpdatePlan = (formData: Omit<Plan, "id">) => {
    if (!plan) return
    mutate({ id: plan?.id || 0, ...formData }, {
      onSuccess: () => {
        handleCloseEditPlanModal()
        reset()
      }
    })
  }

  return (
    <ModalContainer open={editPlanModal}>
      <form
        onSubmit={handleSubmit(handleUpdatePlan)}
      >
        <h3 className="text-lg font-semibold">Edit Plan</h3>
        <p className="text-sm text-secondary-200">
          Edit plan information here.
        </p>
        <div className="flex flex-col gap-4 my-2">
          <label htmlFor="price" className="font-medium font-mono">
            Price
          </label>
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true
            })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          <label htmlFor="name" className="font-medium font-mono">
            Name
          </label>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required"
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <label htmlFor="interval">Interval</label>
          <Select
            {...register("interval", {
              required: "Interval is required"
            })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.interval && <p className="text-red-500 text-sm">{errors.interval.message}</p>}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCloseEditPlanModal}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderIcon className="animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
