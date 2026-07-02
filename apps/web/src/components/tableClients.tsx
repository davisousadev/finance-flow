import type { Client } from "@/types/clientTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type TableClientsProps = {
  clients: Client[];
};

export function TableClients({ clients }: TableClientsProps) {
  return (
    <Table className=" hover:cursor-pointer">
      <TableHeader>
        <TableRow className="bg-neutral-900 border-none">
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Client Name
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Status
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Method
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70 text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow
            key={client.id}
            className="bg-neutral-950 text-secondary-200 border-none hover:bg-neutral-900/70 hover:cursor-pointer"
          >
            <TableCell className="font-bold flex flex-col">
              {client.name}
              <span className="text-xs text-muted-foreground font-mono font-semibold">
                {client.email}
              </span>
            </TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
