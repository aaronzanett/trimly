import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Trash2, CreditCard, Banknote, Wallet, X, Download, QrCode, Building2, Search, User, Phone, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  type: "service" | "product";
  price: number;
  qty: number;
  barber: string;
}

interface Transaction {
  id: string;
  time: string;
  items: string;
  total: number;
  payment: string;
  barber: string;
  customer?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const services = [
  { id: "s1", name: "Haircut", price: 50000 },
  { id: "s2", name: "Beard Trim", price: 30000 },
  { id: "s3", name: "Hair Color", price: 150000 },
  { id: "s4", name: "Hair Wash", price: 25000 },
  { id: "s5", name: "Shave", price: 35000 },
];

const products = [
  { id: "p1", name: "Pomade", price: 85000 },
  { id: "p2", name: "Hair Oil", price: 45000 },
  { id: "p3", name: "Shampoo", price: 65000 },
];

const barbers = ["Ahmad", "Budi", "Charlie", "Self"];

const mockCustomers: Customer[] = [
  { id: "c1", name: "Rizal Hidayat", phone: "081234567890", email: "rizal@mail.com" },
  { id: "c2", name: "Dimas Pratama", phone: "082345678901", email: "dimas@mail.com" },
  { id: "c3", name: "Andi Saputra", phone: "083456789012" },
  { id: "c4", name: "Fajar Nugroho", phone: "084567890123", email: "fajar@mail.com" },
  { id: "c5", name: "Bayu Setiawan", phone: "085678901234" },
];

const bankAccounts = [
  { bank: "BCA", accountNo: "1234567890", accountName: "Trimly Barbershop", logo: "🏦" },
  { bank: "BNI", accountNo: "0987654321", accountName: "Trimly Barbershop", logo: "🏦" },
  { bank: "Mandiri", accountNo: "1122334455", accountName: "Trimly Barbershop", logo: "🏦" },
];

const POSCashier = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBarber, setSelectedBarber] = useState("Self");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCashClosingOpen, setIsCashClosingOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) return [];
    const q = customerSearch.toLowerCase();
    return mockCustomers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }, [customerSearch]);

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
  };

  const clearCustomer = () => {
    setSelectedCustomer(null);
    setCustomerSearch("");
  };

  const copyToClipboard = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "T001", time: "09:15", items: "Haircut, Pomade", total: 135000, payment: "Cash", barber: "Ahmad" },
    { id: "T002", time: "10:30", items: "Beard Trim", total: 30000, payment: "QRIS", barber: "Self" },
    { id: "T003", time: "11:45", items: "Hair Color, Hair Wash", total: 175000, payment: "Card", barber: "Budi" },
  ]);

  const addToCart = (item: { id: string; name: string; price: number }, type: "service" | "product") => {
    const existing = cart.find(c => c.id === item.id && c.barber === selectedBarber);
    if (existing) {
      setCart(cart.map(c => c.id === item.id && c.barber === selectedBarber ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { id: item.id, name: item.name, type, price: item.price, qty: 1, barber: selectedBarber }]);
    }
  };

  const removeFromCart = (id: string, barber: string) => {
    setCart(cart.filter(c => !(c.id === id && c.barber === barber)));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const change = cashReceived ? parseInt(cashReceived) - cartTotal : 0;

  const handlePayment = () => {
    if (cart.length === 0) return;
    const newTx: Transaction = {
      id: `T${String(transactions.length + 1).padStart(3, "0")}`,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      items: cart.map(c => c.name).join(", "),
      total: cartTotal,
      payment: paymentMethod === "cash" ? "Cash" : paymentMethod === "card" ? "Card" : "QRIS",
      barber: [...new Set(cart.map(c => c.barber))].join(", "),
    };
    setTransactions([newTx, ...transactions]);
    setCart([]);
    setCashReceived("");
    setIsPaymentOpen(false);
    toast({ title: "Transaction Complete", description: `${newTx.id} - Rp ${cartTotal.toLocaleString()}` });
  };

  const todayTotal = transactions.reduce((sum, t) => sum + t.total, 0) + cartTotal;
  const cashTotal = transactions.filter(t => t.payment === "Cash").reduce((sum, t) => sum + t.total, 0);

  const handleCashClosing = () => {
    setIsCashClosingOpen(false);
    toast({ title: "Cash Closing Complete", description: `Total cash: Rp ${cashTotal.toLocaleString()}` });
  };

  const handleExport = () => {
    const headers = ["ID", "Time", "Items", "Total", "Payment", "Barber"];
    const rows = transactions.map(t => [t.id, t.time, `"${t.items}"`, t.total, t.payment, t.barber]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">POS / Cashier</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Process transactions quickly.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button onClick={() => setIsCashClosingOpen(true)} variant="outline" className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
            Cash Closing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Menu</CardTitle>
                <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                  <SelectTrigger className="w-32 border-[hsl(var(--admin-border))]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {barbers.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="services">
                <TabsList className="mb-4">
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="services">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map(s => (
                      <button key={s.id} onClick={() => addToCart(s, "service")} className="p-3 rounded-lg border border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))] text-left transition-colors">
                        <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{s.name}</p>
                        <p className="text-sm text-primary">Rp {s.price.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="products">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map(p => (
                      <button key={p.id} onClick={() => addToCart(p, "product")} className="p-3 rounded-lg border border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))] text-left transition-colors">
                        <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{p.name}</p>
                        <p className="text-sm text-primary">Rp {p.price.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Today's Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[hsl(var(--admin-border))]">
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">ID</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Time</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Items</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Total</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Payment</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Barber</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(t => (
                    <TableRow key={t.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                      <TableCell className="text-[hsl(var(--admin-card-foreground))] font-mono">{t.id}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{t.time}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{t.items}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {t.total.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="outline">{t.payment}</Badge></TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{t.barber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Cart */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] h-fit sticky top-20">
          <CardHeader>
            <CardTitle className="text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Cart
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-[hsl(var(--admin-muted-foreground))] py-8">Cart is empty</p>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.barber}`} className="flex items-center justify-between p-2 rounded bg-[hsl(var(--admin-background))]">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[hsl(var(--admin-card-foreground))]">{item.name} x{item.qty}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{item.barber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[hsl(var(--admin-card-foreground))]">Rp {(item.price * item.qty).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(item.id, item.barber)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-[hsl(var(--admin-border))] pt-3">
              <div className="flex justify-between text-lg font-bold text-[hsl(var(--admin-card-foreground))]">
                <span>Total</span>
                <span>Rp {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <Button onClick={() => setIsPaymentOpen(true)} disabled={cart.length === 0} className="w-full gap-2">
              <CreditCard className="w-4 h-4" /> Pay Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">Rp {cartTotal.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "cash", label: "Cash", icon: Banknote },
                  { value: "card", label: "Card", icon: CreditCard },
                  { value: "qris", label: "QRIS", icon: Wallet },
                ].map(m => (
                  <button
                    key={m.value}
                    onClick={() => setPaymentMethod(m.value)}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-1 transition-colors ${
                      paymentMethod === m.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-[hsl(var(--admin-border))] text-[hsl(var(--admin-muted-foreground))]"
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                    <span className="text-sm">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Cash Received</Label>
                <Input
                  type="number"
                  value={cashReceived}
                  onChange={e => setCashReceived(e.target.value)}
                  placeholder="Enter amount"
                  className="border-[hsl(var(--admin-border))]"
                />
                {parseInt(cashReceived) >= cartTotal && (
                  <p className="text-sm text-green-600">Change: Rp {change.toLocaleString()}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)} className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">Cancel</Button>
            <Button onClick={handlePayment} disabled={paymentMethod === "cash" && parseInt(cashReceived) < cartTotal}>
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cash Closing Dialog */}
      <Dialog open={isCashClosingOpen} onOpenChange={setIsCashClosingOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">Cash Closing Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]">
                <span>Total Transactions</span>
                <span className="font-medium">{transactions.length}</span>
              </div>
              <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]">
                <span>Cash Transactions</span>
                <span className="font-medium">Rp {cashTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]">
                <span>Card/QRIS Transactions</span>
                <span className="font-medium">Rp {(todayTotal - cashTotal).toLocaleString()}</span>
              </div>
              <div className="border-t border-[hsl(var(--admin-border))] pt-2 flex justify-between text-lg font-bold text-primary">
                <span>Grand Total</span>
                <span>Rp {todayTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCashClosingOpen(false)} className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">Cancel</Button>
            <Button onClick={handleCashClosing}>Confirm Closing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POSCashier;
