import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

function OAuthRedirect() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  useEffect(() => {
    console.log("CURRENT URL =", window.location.href);
    const params = new URLSearchParams(window.location.search);
    console.log("TOKEN =", params.get("token"));
    console.log("REFRESH =", params.get("refreshToken"));
    console.log("ERROR =", params.get("error"));
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const error = params.get("error");

    if (error || !token) {
      toast.error(error || "OAuth login failed");
      navigate({ to: "/login" });
      return;
    }

    localStorage.setItem("access_token", token);
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
    setToken(token);

    authService
      .getCurrentUser()
      .then((user) => {
        setUser(user);
        toast.success("Signed in!");
        navigate({ to: "/dashboard" });
      })
      .catch(() => {
        toast.error("Failed to fetch profile");
        navigate({ to: "/login" });
      });
  }, [navigate, setToken, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm text-slate-400">Signing you in...</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/oauth2/redirect")({ component: OAuthRedirect });
