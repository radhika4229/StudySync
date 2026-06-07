import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CollabStudy. Study together, achieve more.</p>
        <nav className="flex gap-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/rooms" className="hover:text-foreground transition-colors">Rooms</Link>
          <Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
