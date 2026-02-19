import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ClientLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast({ title: "Lengkapi semua kolom", variant: "destructive" });
      return;
    }
    const result = login(form.email, form.password);
    if (!result.success) {
      toast({ title: "Login Gagal", description: result.error, variant: "destructive" });
      return;
    }
    toast({ title: "Selamat datang kembali!", description: "Login berhasil." });
    const from = (location.state as any)?.from?.pathname;
    navigate(from ?? "/client", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Scissors className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Trimly</h1>
          <p className="text-muted-foreground text-sm mt-1">Masuk ke akun pelanggan Anda</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Masuk</CardTitle>
            <CardDescription>Masukkan email dan kata sandi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">Masuk</Button>
            </form>

            {/* Demo hint */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border text-xs text-muted-foreground space-y-0.5">
              <p className="font-medium text-foreground text-sm">Demo akun client:</p>
              <p>Email: <span className="font-mono">client@trimly.com</span></p>
              <p>Kata sandi: <span className="font-mono">client123</span></p>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Belum punya akun? </span>
              <Link to="/client/register" className="text-primary hover:underline font-medium">
                Daftar sekarang
              </Link>
            </div>
            <div className="mt-2 text-center">
              <Link to="/client" className="text-xs text-muted-foreground hover:text-foreground">
                ← Kembali ke Temukan Barbershop
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientLogin;
