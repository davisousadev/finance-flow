import { useFinanceContext } from "@/context/financeContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ModalContainer } from "./modalContainer";
import React from "react";
import { useUpdateClientMutation } from "@/hooks/useClientsQuery";
import { LoaderIcon } from "lucide-react";

export function ModalEditClient() {
  const {
    handleCloseEditClientModal,
    editClientModal,
    client,
  } = useFinanceContext();

  const [name, setName] = React.useState(client?.name || "");
  const [email, setEmail] = React.useState(client?.email || "");

  const { mutate, isPending } = useUpdateClientMutation();

  React.useEffect(() => {
    setName(client?.name || "");
    setEmail(client?.email || "");
  }, [client]);

  const handleUpdate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!client) return;

    mutate(
      { id: client.id, name, email },
      {
        onSuccess: () => {
          handleCloseEditClientModal();
        },
      }
    );
  };

  return (
    <ModalContainer open={editClientModal}>
      <form onSubmit={handleUpdate}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email" className="font-medium font-mono">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCloseEditClientModal}
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
