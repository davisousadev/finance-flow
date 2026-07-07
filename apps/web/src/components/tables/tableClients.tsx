import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useFinanceContext } from "@/context/financeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Loading } from "../loading";

export function TableClients() {
  const { clients, handleOpenModalClient, loading, handleOpenDeleteClientModal } = useFinanceContext();

  if (loading)  return <Loading />;

  if (!clients || clients.length === 0) return <div>No clients available</div>;

  return (
    <Table className=" hover:cursor-pointer">
      <TableHeader>
        <TableRow className="bg-neutral-900 border-none">
          <TableHead className=" font-mono font-bold text-primary-100/70">
            ID
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Name
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Email
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow
            key={client.id}
            className="bg-neutral-950 text-secondary-200 border-none hover:bg-neutral-900/70 hover:cursor-pointer"
          >
            <TableCell className="font-bold">{client.id}</TableCell>
            <TableCell className="font-bold">{client.name}</TableCell>
            <TableCell className="font-bold">{client.email}</TableCell>
            <TableCell className="font-bold">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleOpenModalClient(client)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={() => handleOpenDeleteClientModal(client)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
