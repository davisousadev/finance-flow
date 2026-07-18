import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFinanceContext } from "@/context/financeContext";
import { LoaderIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCreateClientMutation } from "@/hooks/useClientsQuery";
import { useForm } from "react-hook-form";
import type { Client } from "@/types/clientTypes";

export function ModalCreateClient() {

  const { mutate, isPending } = useCreateClientMutation()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Client, "id">>({
    defaultValues: {
      name: "",
      email: ""
    }
  });

  const { openModal, handleCloseModal } = useFinanceContext();

  const handleCreateClient = (formData: { name: string, email: string }) => {
    mutate(formData, {
      onSuccess: () => {
        handleCloseModal("createClient")
        reset()
      }
    })
  }

  return (
    <ModalContainer open={openModal.createClient}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleSubmit(handleCreateClient)}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-secondary-200">
            Add New Client
          </h3>
          <p className="text-primary-100 text-sm">
            Fill in the details to add a new client.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-primary-100 font-mono" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            placeholder="Client Name"
            className="text-primary-100"
            {...register("name", {
              required: "Name is required"
            })}
            disabled={isPending}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <label className="text-primary-100 font-mono" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Client Email"
            className="text-primary-100"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            disabled={isPending}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <Separator className="my-4" />
        <footer className="flex justify-end gap-2">
          <Button
            type="button"
            disabled={isPending}
            variant="ghost"
            onClick={() => handleCloseModal("createClient")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <LoaderIcon className="animate-spin" /> : "Create Client"}
          </Button>
        </footer>
      </form>
    </ModalContainer>
  );
}
