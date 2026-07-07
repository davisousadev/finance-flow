import { useFinanceContext } from "@/context/financeContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ModalEditPlan() {
  const { handleCloseEditPlanModal, editPlanModal, handleUpdatePlans, plan } =
    useFinanceContext();

  const [name, setName] = React.useState(plan?.name || "");
  const [price, setPrice] = React.useState(plan?.price || "");
  const [interval, setInterval] = React.useState<"monthly" | "yearly">(
    plan?.interval || "monthly",
  );

  React.useEffect(() => {
    setName(plan?.name || "");
    setPrice(plan?.price || "");
    setInterval(plan?.interval || "monthly");
  }, [plan]);

  return (
    <ModalContainer open={editPlanModal}>
      <form
        onSubmit={(e) => {
          handleUpdatePlans(e, {
            id: plan?.id || 0,
            name,
            price: Number(price),
            interval,
          });
        }}
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
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="name" className="font-medium font-mono">
            Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="interval">Interval</label>
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
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCloseEditPlanModal}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </ModalContainer>
  );
}
