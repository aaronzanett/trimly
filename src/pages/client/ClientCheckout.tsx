import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, CreditCard, Banknote, QrCode, CheckCircle2, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CartItem = { id: string; type: "service" | "product"; name: string; price: number; quantity: number; detail?: string };

const initialCart: CartItem[] = [
  { id: "s1", type: "service", name: "Classic Haircut", price: 50000, quantity: 1, detail: "Rizal Hidayat · Feb 20, 3:00 PM" },
  { id: "s2", type: "service", name: "Beard Trim", price: 30000, quantity: 1, detail: "Rizal Hidayat · Feb 20, 3:30 PM" },
  { id: "p1", type: "product", name: "Pomade Strong Hold", price: 85000, quantity: 2 },
];

const paymentMethods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "qris", label: "QRIS / E-Wallet", icon: QrCode },
];

const ClientCheckout = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showReceipt, setShowReceipt] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const serviceItems = cart.filter(i => i.type === "service");
  const productItems = cart.filter(i => i.type === "product");
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceFee = 5000;
  const total = subtotal + serviceFee;

  const handleCheckout = () => {
    setShowReceipt(true);
    toast({ title: "Payment Successful!", description: "Your digital receipt is ready." });
  };

  const receiptNumber = `TRM-${Date.now().toString().slice(-8)}`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Services */}
          {serviceItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {serviceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.detail && <p className="text-xs text-muted-foreground">{item.detail}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">Rp {item.price.toLocaleString("id-ID")}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Products */}
          {productItems.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {productItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold text-sm w-16 text-right">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <method.icon className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor={method.id} className="cursor-pointer flex-1">{method.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                 <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                 <span className="text-primary text-lg">Rp {total.toLocaleString("id-ID")}</span>
               </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={handleCheckout}>
            Pay Rp {total.toLocaleString("id-ID")}
          </Button>
        </div>
      )}

      {/* Digital Receipt */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-2" />
              Payment Successful
            </DialogTitle>
          </DialogHeader>
          <div className="border border-dashed border-border rounded-lg p-4 space-y-3 text-sm">
            <div className="text-center">
              <p className="font-display font-bold text-lg">Trimly</p>
              <p className="text-xs text-muted-foreground">Digital Receipt</p>
              <p className="text-xs text-muted-foreground">{receiptNumber}</p>
            </div>
            <Separator />
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} {item.quantity > 1 && `x${item.quantity}`}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
               <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
             </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <Separator />
            <div className="text-center text-xs text-muted-foreground">
              <p>Payment: {paymentMethods.find(m => m.id === paymentMethod)?.label}</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
            <Button className="flex-1" onClick={() => setShowReceipt(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientCheckout;
