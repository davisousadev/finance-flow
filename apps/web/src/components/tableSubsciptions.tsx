import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { SubscriptionDetails } from "@/types/subscriptions";

type TableSubscriptionsProps = {
  subscriptions: SubscriptionDetails[];
};

export function TableSubscriptions({ subscriptions }: TableSubscriptionsProps) {
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
            <TableCell className="font-bold flex flex-col">
              {subscription.clientName}
              <span className="text-xs text-muted-foreground font-mono font-semibold">
                {subscription.clientEmail}
              </span>
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
