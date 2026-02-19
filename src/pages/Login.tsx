import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Scissors, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ACCOUNTS } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    const result = login(data.email, data.password);
    if (!result.success) {
      toast({ title: "Login Failed", description: result.error, variant: "destructive" });
      return;
    }

    // Find the matched account to get user role/tenant
    const account = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === data.email.trim().toLowerCase()
    );

    toast({ title: "Login Successful!", description: "Welcome back to Trimly." });

    const from = (location.state as any)?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    if (account?.user.role === "owner") {
      navigate(`/${account.user.tenant}/dashboard`, { replace: true });
    } else if (account?.user.role === "staff") {
      navigate(`/${account.user.tenant}/staff/dashboard`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Scissors className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome <span className="text-gradient-gold">Back</span>
            </h1>
            <p className="font-body text-slate-300 max-w-md">
              Sign in to manage your barbershop, track appointments, and grow your business.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 text-left">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400">Active Barbershops</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-sm text-slate-400">Uptime Guarantee</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Trimly</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Sign in to your account</h2>
          <p className="font-body text-muted-foreground mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">Start your free trial</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password")} className={errors.password ? "border-destructive pr-10" : "pr-10"} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Demo accounts (owner & staff):</p>
            <p>Owner: <span className="font-mono">owner@trimly.com</span> / <span className="font-mono">owner123</span></p>
            <p>Staff: <span className="font-mono">staff@trimly.com</span> / <span className="font-mono">staff123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
