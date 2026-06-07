import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});
type FormData = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    try {
      const res = await authService.login(values.email, values.password);
      localStorage.setItem("access_token", res.accessToken);
      if (res.refreshToken) localStorage.setItem("refresh_token", res.refreshToken);
      setToken(res.accessToken);
      setUser(res.user);
      toast.success("Welcome back!");
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CollabStudy</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-6 shadow-xl backdrop-blur">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                {...register("password")}
              />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs text-slate-500">or continue with</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <OAuthButtons />
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login")({ component: LoginPage });
