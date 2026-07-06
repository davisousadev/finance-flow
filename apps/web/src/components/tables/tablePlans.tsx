import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useFinanceContext } from "@/context/financeContext";

export function TablePlans() {
  const { plans } = useFinanceContext();
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
            Price
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow
            key={plan.id}
            className="bg-neutral-950 text-secondary-200 border-none hover:bg-neutral-900/70 hover:cursor-pointer"
          >
            <TableCell className="font-bold">{plan.id}</TableCell>
            <TableCell className="font-bold">{plan.name}</TableCell>
            <TableCell className="font-bold">${plan.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
