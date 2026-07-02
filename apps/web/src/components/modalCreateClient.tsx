import React from "react";
import { ModalContainer } from "./modalContainer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { clientsService } from "@/services/clientsService";
import type { Client } from "@/types/clientTypes";
import { toast } from "sonner";

type ModalCreateClientProps = {
  open: boolean;
  closeModal?: () => void;
  setClients?: React.Dispatch<React.SetStateAction<Client[]>>;
};

export function ModalCreateClient({
  open,
  closeModal,
  setClients,
}: ModalCreateClientProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (!name || !email) {
        throw new Error("Name and email are required");
      }
      const createdClient = await clientsService.createClient({ name, email });
      setClients?.((prevClients) => [...prevClients, createdClient]);
      toast.success("Client created successfully!");
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setName("");
      setEmail("");
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
            placeholder="Client Email"
            className="text-primary-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <footer className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button>Create Client</Button>
        </footer>
      </form>
    </ModalContainer>
  );
}
