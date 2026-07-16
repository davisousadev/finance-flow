import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useFinanceContext } from "@/context/financeContext";

export function TableSubscriptions() {
  const { subscriptions } = useFinanceContext()

  function getBadgeVariant(status: string) {
    switch (status) {
      case "active":
        return "success";
      case "canceled":
        return "destructive";
      case "expired":
        return "warning";
      default:
        return "default";
    }
  }


  if (!subscriptions || subscriptions.length === 0) return <div>No subscriptions available</div>;

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
            Plan Name
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70">
            Plan Interval
          </TableHead>
          <TableHead className=" font-mono font-bold text-primary-100/70 text-right">
            Price
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow
            key={subscription.id}
            className="bg-neutral-950 text-secondary-200 border-none hover:bg-neutral-900/70 hover:cursor-pointer"
          >
            <TableCell className="font-bold">
              <div className="flex flex-col">
                <span>{subscription.clientName}</span>
                <span className="text-xs text-muted-foreground font-mono font-semibold">
                  {subscription.clientEmail}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(subscription.status)}>
                {subscription.status}
              </Badge>
            </TableCell>
            <TableCell>{subscription.planName}</TableCell>
            <TableCell>{subscription.planInterval}</TableCell>
            <TableCell className="text-right">
              ${subscription.planPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
