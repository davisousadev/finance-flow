import React from "react";
import { ModalContainer } from "./modalContainer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFinanceContext } from "@/context/financeContext";
import { LoaderIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCreateClientMutation } from "@/hooks/useClientsQuery";

export function ModalCreateClient() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { mutate, isPending } = useCreateClientMutation()

  const { openModal, handleCloseModal } = useFinanceContext();

  const handleCreateClient = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name, email }, {
      onSuccess: () => {
        handleCloseModal("createClient")
        setName("")
        setEmail("")
      }
    })
  }

  return (
    <ModalContainer open={openModal.createClient}>
      <form
        className="flex flex-col gap-4 px-6 py-2 rounded-lg"
        onSubmit={handleCreateClient}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="text-primary-100 font-mono" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Client Email"
            className="text-primary-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Separator className="my-4" />
        <footer className="flex justify-end gap-2">
          <Button
            type="button"
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
