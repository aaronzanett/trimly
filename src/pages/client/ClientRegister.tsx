import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Scissors, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      toast({ title: "Lengkapi semua kolom wajib", variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Setujui syarat & ketentuan terlebih dahulu", variant: "destructive" });
      return;
    }
    toast({ title: "Pendaftaran berhasil!", description: "Selamat datang di Trimly." });
    navigate("/client");
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
          <p className="text-muted-foreground text-sm mt-1">Buat akun pelanggan baru</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Daftar</CardTitle>
            <CardDescription>Isi data diri Anda untuk mulai memesan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nama Depan *</Label>
                  <Input
                    id="firstName"
                    placeholder="Budi"
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input
                    id="lastName"
                    placeholder="Setiawan"
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  placeholder="+62 812 345 6789"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 karakter"
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

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(!!v)}
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                  Saya menyetujui{" "}
                  <Link to="/terms" target="_blank" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link to="/privacy" target="_blank" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full">Buat Akun</Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Sudah punya akun? </span>
              <Link to="/client/login" className="text-primary hover:underline font-medium">
                Masuk di sini
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

export default ClientRegister;
