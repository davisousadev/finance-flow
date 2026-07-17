import { useFinanceContext } from "@/context/financeContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import { useUpdateClientMutation } from "@/hooks/useClientsQuery";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { Client } from "@/types/clientTypes";

export function ModalEditClient() {
  const {
    handleCloseEditClientModal,
    editClientModal,
    client,
  } = useFinanceContext();

  const { mutate, isPending } = useUpdateClientMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    values: {
      name: client?.name || "",
      email: client?.email || ""
    }
  })

  const handleUpdate = (formData: Omit<Client, "id">) => {
    if (!client) return;

    mutate(
      { id: client.id, ...formData },
      {
        onSuccess: () => {
          handleCloseEditClientModal();
          reset()
        },
      }
    );
  };

  return (
    <ModalContainer open={editClientModal}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <h3 className="text-lg font-semibold">Edit Client</h3>
        <p className="text-sm text-secondary-200">
          Edit client information here.
        </p>
        <div className="flex flex-col gap-4 my-2">
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
          <label htmlFor="email" className="font-medium font-mono">
            Email
          </label>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCloseEditClientModal}
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
