import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description: string;
  data: string;
  icon: React.ReactNode;
  className?: string;
};

export function Card({ title, description, data, icon, className }: CardProps) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-neutral-800 bg-neutral-950 p-6 cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-primary-100/80 font-mono">
            {title}
          </h3>
          <p className="text-2xl text-primary-100">{data}</p>
        </div>
        <div className="bg-neutral-800 p-2 rounded-lg">{icon}</div>
      </div>
      <p className="text-emerald-400 mt-2 text-sm font-mono">{description}</p>
    </div>
  );
}
