import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Scissors, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate verification - replace with actual API call when backend is connected
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Verification Successful!",
      description: "Your account has been verified. Welcome to Trimly!",
    });
    
    // Navigate to login or dashboard after successful verification
    navigate("/login");
    setIsSubmitting(false);
  };

  const handleResendCode = async () => {
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email/phone.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Scissors className="h-12 w-12 text-white" />
              <span className="font-display text-4xl font-bold text-white">Trimly</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Almost There!
            </h1>
            <p className="font-body text-white/80 max-w-md">
              We've sent a verification code to your email/phone. Enter the code below to complete your registration.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registration
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Trimly</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Verify your account
          </h2>
          <p className="font-body text-muted-foreground mb-8">
            Enter the 6-digit code we sent to your email or phone number.
          </p>

          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                value={code}
                onChange={setCode}
                maxLength={6}
              >
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
              variant="hero"
              className="w-full"
              onClick={handleVerify}
              disabled={isSubmitting || code.length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Verify Account"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive a code?
              </p>
              <Button
                variant="link"
                onClick={handleResendCode}
                className="text-primary"
              >
                Resend Code
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Having trouble?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
