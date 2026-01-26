import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const adminLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  password: z.string().min(1, "Password is required").max(128, "Password is too long"),
  rememberMe: z.boolean().optional(),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMeValue = watch("rememberMe");

  const onSubmit = async (data: AdminLoginFormData) => {
    // Simulate admin login - replace with actual API call when backend is connected
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Admin Login Successful!",
      description: "Welcome to the Trimly Admin Dashboard.",
    });
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
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Admin <span className="text-gradient-gold">Portal</span>
            </h1>
            <p className="font-body text-slate-300 max-w-md">
              Access the Trimly SaaS management dashboard. Monitor platform analytics, manage subscriptions, and oversee operations.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-6 text-left">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400">Active Barbershops</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-sm text-slate-400">Monthly Appointments</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Admin Portal</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4 ml-auto">
            <Shield className="h-3.5 w-3.5" />
            Restricted Access
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            SaaS Admin Login
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Enter your admin credentials to access the platform management dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@trimly.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMeValue}
                onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal text-muted-foreground">
                Keep me signed in
              </Label>
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              This portal is for authorized Trimly platform administrators only. Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
