import { plansService } from "@/services/plansService";
import { ModalContainer } from "./modalContainer";
import { Button } from "./ui/button";
import React from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Plan } from "@/types/plansTypes";

type ModalCreatePlanProps = {
  open: boolean;
  closeModal?: () => void;
  setCreatedPlan?: React.Dispatch<React.SetStateAction<Plan[]>>;
};

export function ModalCreatePlan({ open, closeModal, setCreatedPlan }: ModalCreatePlanProps) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [interval, setInterval] = React.useState<"monthly" | "yearly">(
    "monthly",
  );

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (!name || !price) {
        throw new Error("Name and price are required");
      }
      const newPlan = await plansService.createPlan({
        name,
        price: parseFloat(price),
        interval,
      });
      toast.success("Plan created successfully!");
      setCreatedPlan?.((prevPlans) => [...prevPlans, newPlan]);
    } catch (error) {
      console.error("Error creating plan:", error);
    } finally {
      setName("");
      setPrice("");
      setInterval("monthly");
      closeModal?.();
    }
  }

  return (
    <ModalContainer open={open}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleSubmit}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="text-primary-100 font-mono" htmlFor="price">
            Price
          </label>
          <Input
            id="price"
            placeholder="Plan Price"
            className="text-primary-100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label className="text-primary-100 font-mono" htmlFor="interval">
            Interval
          </label>
          <Select
            value={interval}
            onValueChange={(value) =>
              setInterval(value as "monthly" | "yearly")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant={"ghost"} onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Create Plan</Button>
        </div>
      </form>
    </ModalContainer>
  );
}
