import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <Loader2
      className={cn("animate-spin text-indigo-500", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <Spinner size={36} />
    </div>
  );
}

export default Spinner;
