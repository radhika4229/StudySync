import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, GraduationCap, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { notificationService } from "@/services/notificationService";
import { authService } from "@/services/authService";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/rooms", label: "Rooms" },
  { to: "/leaderboard", label: "Leaderboard" },
] as const;

export function AppNavbar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: unread = 0 } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: notificationService.unreadCount,
    refetchInterval: 30_000,
  });

  const initials = (user?.fullName || user?.username || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore */
    }
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">CollabStudy</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-white bg-slate-800" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden sm:flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-200 transition-colors hover:bg-slate-800">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-xs text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[120px] truncate font-medium sm:inline">
                  {user?.username || "Account"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-slate-700 bg-slate-800 text-slate-100">
              <DropdownMenuLabel className="text-slate-400">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem asChild className="focus:bg-slate-700 focus:text-white">
                <Link to="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:bg-slate-700 focus:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-200 hover:bg-slate-800 hover:text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-1 border-t border-slate-800 px-4 py-3 animate-in slide-in-from-top-2 fade-in duration-200">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-white bg-slate-800" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="text-left rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-slate-800"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default AppNavbar;
