import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useFinanceContext } from "@/context/financeContext";

export function TableClients() {
  const { clients } = useFinanceContext();
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
