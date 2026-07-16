import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useFinanceContext } from "@/context/financeContext";
import { Loading } from "../loading";
import { usePlansQuery } from "@/hooks/usePlansQuery";

export function TablePlans() {
  const { data: plans, isError, isLoading, error } = usePlansQuery()

  const { handleOpenEditPlanModal, handleOpenDeletePlanModal } = useFinanceContext();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  if (!plans || plans.length === 0) return <div>No plans available</div>;

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
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Actions
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
            <TableCell className="font-bold">
              ${plan.price.toFixed(2)}
            </TableCell>
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
                    onClick={() => handleOpenEditPlanModal(plan)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleOpenDeletePlanModal(plan)}
                  >
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
