import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Mail, RotateCcw } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const ClientVerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Email passed from registration form
  const email: string = (location.state as any)?.email ?? "email Anda";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast({ title: "Kode tidak lengkap", description: "Masukkan 6 digit kode verifikasi.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    // Simulate verification — swap for real API call when backend is connected
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Verifikasi berhasil!", description: "Akun Anda telah aktif. Silakan masuk." });
    navigate("/client/login", { replace: true });
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsResending(false);
    toast({ title: "Kode dikirim ulang", description: `Kode baru telah dikirim ke ${email}.` });
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
          <p className="text-muted-foreground text-sm mt-1">Verifikasi akun Anda</p>
        </div>

        <Card>
          <CardHeader className="pb-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Cek Email Anda</CardTitle>
            <CardDescription className="mt-1">
              Kami mengirimkan kode verifikasi 6 digit ke{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP value={code} onChange={setCode} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || code.length !== 6}
              >
                {isSubmitting ? "Memverifikasi..." : "Verifikasi Akun"}
              </Button>
            </form>

            {/* Resend */}
            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">Tidak menerima kode?</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary gap-1.5"
              >
                <RotateCcw className={`h-3.5 w-3.5 ${isResending ? "animate-spin" : ""}`} />
                {isResending ? "Mengirim..." : "Kirim ulang kode"}
              </Button>
            </div>

            {/* Back link */}
            <div className="mt-4 text-center">
              <Link
                to="/client/register"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ← Kembali ke pendaftaran
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Kode berlaku selama <span className="font-medium">10 menit</span>. Periksa folder spam jika tidak menerima email.
        </p>
      </div>
    </div>
  );
};

export default ClientVerifyCode;
