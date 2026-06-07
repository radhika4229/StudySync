import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { API_BASE_URL } from "@/services/api";

const HEALTH_URL = API_BASE_URL.replace(/\/api\/?$/, "") + "/actuator/health";

export function BackendHealthBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(HEALTH_URL, { signal: ctrl.signal });
        clearTimeout(t);
        if (!cancelled) setOffline(!res.ok);
      } catch {
        if (!cancelled) setOffline(true);
      }
    };
    check();
    const id = setInterval(check, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="sticky top-0 z-[60] flex items-center justify-center gap-2 border-b border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-200 backdrop-blur">
      <AlertTriangle className="h-4 w-4" />
      Backend offline — some features may not work.
    </div>
  );
}

export default BackendHealthBanner;
