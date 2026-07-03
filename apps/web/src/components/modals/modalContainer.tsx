import React from "react";
import { cn } from "@/lib/utils";

type ModalContainerProps = {
  children: React.ReactNode;
  open: boolean;
};

export function ModalContainer({ children, open }: ModalContainerProps) {
  const [mounted, setMounted] = React.useState(open);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(timeout);
  }, [open]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-lg rounded-lg bg-neutral-950 p-6 shadow-lg transition-all duration-200",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}