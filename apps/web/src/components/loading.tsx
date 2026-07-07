import { LoaderIcon } from "lucide-react";

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
