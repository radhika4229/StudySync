import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Globe, Lock } from "lucide-react";
import toast from "react-hot-toast";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roomService, SUBJECTS, type CreateRoomPayload } from "@/services/roomService";

export const Route = createFileRoute("/rooms/create")({
  component: () => (
    <ProtectedRoute>
      <CreateRoomPage />
    </ProtectedRoute>
  ),
});

const schema = z
  .object({
    name: z.string().min(1, "Required").max(100, "Max 100 characters"),
    subject: z.string().min(1, "Subject is required"),
    topic: z.string().max(120).optional().or(z.literal("")),
    description: z.string().max(500, "Max 500 characters").optional().or(z.literal("")),
    isPublic: z.boolean(),
    maxParticipants: z.number().min(2).max(50),
    passwordProtected: z.boolean(),
    password: z.string().optional().or(z.literal("")),
  })
  .refine((d) => !d.passwordProtected || (d.password && d.password.length >= 4), {
    message: "Password must be at least 4 characters",
    path: ["password"],
  });

type FormValues = z.infer<typeof schema>;

function CreateRoomPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      description: "",
      isPublic: true,
      maxParticipants: 10,
      passwordProtected: false,
      password: "",
    },
  });

  const isPublic = watch("isPublic");
  const maxParticipants = watch("maxParticipants");
  const passwordProtected = watch("passwordProtected");
  const subject = watch("subject");
  const description = watch("description") ?? "";

  const createM = useMutation({
    mutationFn: (payload: CreateRoomPayload) => roomService.create(payload),
    onSuccess: (r) => {
      toast.success("Room created");
      navigate({ to: "/rooms/$roomId", params: { roomId: r.id } });
    },
    onError: (e: { response?: { data?: { message?: string } }; message?: string }) => {
      toast.error(e?.response?.data?.message || e?.message || "Failed to create room");
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("FORM VALUES =", values);
    const payload: CreateRoomPayload = {
      name: values.name,
      subject: values.subject,
      topic: values.topic || undefined,
      description: values.description || undefined,
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
      maxParticipants: values.maxParticipants,
      passwordProtected: values.passwordProtected,
      roomPassword: values.passwordProtected
          ? values.password || undefined
          : undefined,
    };

    console.log("CREATE ROOM PAYLOAD =", payload);

    createM.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AppNavbar />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Link to="/rooms" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to rooms
        </Link>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight">Create a Study Room</h1>
          <p className="mt-1 text-sm text-slate-400">
            Set up a space for focused, collaborative study.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <Field label="Room Name" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g. Calc II Marathon"
                maxLength={100}
                className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
              />
            </Field>

            <Field label="Subject" error={errors.subject?.message} required>
              <Select value={subject} onValueChange={(v) => setValue("subject", v, { shouldValidate: true })}>
                <SelectTrigger className="border-slate-700 bg-slate-900 text-slate-100 focus:ring-indigo-500">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800 text-slate-100">
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s} className="focus:bg-slate-700 focus:text-white">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Topic" error={errors.topic?.message}>
              <Input
                {...register("topic")}
                placeholder="e.g. Integration techniques"
                className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
              />
            </Field>

            <Field
              label="Description"
              error={errors.description?.message}
              hint={`${description.length}/500`}
            >
              <Textarea
                {...register("description")}
                placeholder="What will you study together?"
                maxLength={500}
                rows={4}
                className="border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
              />
            </Field>

            <div>
              <Label className="text-slate-200">Visibility</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-slate-700 bg-slate-900 p-1">
                <VisibilityOption
                  active={isPublic}
                  onClick={() =>
                      setValue("isPublic", true, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                  }
                  icon={<Globe className="h-4 w-4" />}
                  label="Public"
                  desc="Anyone can find it"
                />
                <VisibilityOption
                    active={!isPublic}
                    onClick={() =>
                        setValue("isPublic", false, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                    }
                    icon={<Lock className="h-4 w-4" />}
                    label="Private"
                    desc="Invite-only"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-200">Max Participants</Label>
                <span className="text-sm font-semibold text-indigo-300">{maxParticipants}</span>
              </div>
              <Slider
                value={[maxParticipants]}
                min={2}
                max={50}
                step={1}
                onValueChange={(v) => setValue("maxParticipants", v[0])}
                className="mt-3"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>2</span>
                <span>50</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-200">Password protection</Label>
                  <p className="text-xs text-slate-500">Require a password to join.</p>
                </div>
                <Switch
                  checked={passwordProtected}
                  onCheckedChange={(c) => setValue("passwordProtected", c)}
                />
              </div>
              {passwordProtected && (
                <div className="mt-4 space-y-1">
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Room password"
                    className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500"
                  />
                  {errors.password?.message && (
                    <p className="text-xs text-red-400">{errors.password.message}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/rooms" })}
                className="border-slate-700 bg-transparent text-slate-200 hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createM.isPending}
                className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90"
              >
                {createM.isPending ? "Creating..." : "Create Room"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-slate-200">
          {label} {required && <span className="text-red-400">*</span>}
        </Label>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function VisibilityOption({
  active,
  onClick,
  icon,
  label,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-1 rounded-md px-4 py-3 text-left transition-colors ${
        active
          ? "bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-white ring-1 ring-indigo-500"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </div>
      <span className="text-xs text-slate-500">{desc}</span>
    </button>
  );
}
