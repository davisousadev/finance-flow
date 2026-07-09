import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import React from "react";
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

export function ModalCreatePlan() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [interval, setInterval] = React.useState<"monthly" | "yearly">(
    "monthly",
  );

  const { openModal, handleCreatePlan, handleCloseModal, loading } = useFinanceContext();

  React.useEffect(() => {
    if (openModal.createPlan) {
      setName("");
      setPrice("");
      setInterval("monthly");
    }
  }, [openModal.createPlan])

  return (
    <ModalContainer open={openModal.createPlan}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={(e) => {
          handleCreatePlan(e, name, price, interval);
        }}
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
            type="number"
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
        <Separator className="my-4" />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => handleCloseModal("createPlan")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderIcon className="animate-spin" /> : "Create Plan"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
