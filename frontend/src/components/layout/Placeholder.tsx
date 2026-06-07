import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

export function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="max-w-md text-center rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)]/20">
            <Construction className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description ?? "Coming soon."}</p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
