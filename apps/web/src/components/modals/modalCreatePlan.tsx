import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import { useCreatePlanMutation } from "@/hooks/usePlansQuery";
import { useForm } from "react-hook-form";
import type { Plan } from "@/types/plansTypes";

export function ModalCreatePlan() {
  const { mutate, isPending } = useCreatePlanMutation()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      interval: "monthly"
    }
  })

  const { openModal, handleCloseModal } = useFinanceContext();

  const handleCreatePlan = (formData: Omit<Plan, "id">) => {
    mutate(formData, {
      onSuccess: () => {
        handleCloseModal("createPlan")
        reset()
      }
    })
  }

  return (
    <ModalContainer open={openModal.createPlan}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleSubmit(handleCreatePlan)}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-secondary-200">
            Add New Plan
          </h3>
          <p className="text-primary-100 text-sm">
            Fill in the details to add a new plan.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-primary-100 font-mono" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            placeholder="Plan Name"
            className="text-primary-100"
            {...register("name", {
              required: "Name is required"
            })}
            disabled={isPending}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <label className="text-primary-100 font-mono" htmlFor="price">
            Price
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Plan Price"
            className="text-primary-100"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true
            })}
            disabled={isPending}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          <label className="text-primary-100 font-mono" htmlFor="interval">
            Interval
          </label>
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
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => handleCloseModal("createPlan")}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderIcon className="animate-spin" /> : "Create Plan"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
