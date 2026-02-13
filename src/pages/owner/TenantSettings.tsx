import { useState } from "react";
import { Upload, Save, CreditCard, Receipt, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function TenantSettings() {
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    name: "Trimly Barbershop", tagline: "Premium Grooming Experience",
    email: "contact@trimly.com", phone: "+62 21 1234567",
    address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220",
    taxId: "01.234.567.8-901.000", license: "SIUP-12345678",
  });

  // Tax state
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [taxRate, setTaxRate] = useState(11);
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(true);
  const [serviceChargeRate, setServiceChargeRate] = useState(5);

  // Payment state
  const [payments, setPayments] = useState({ cash: true, card: true, qris: true, transfer: false });

  const handleSaveProfile = () => {
    if (!profile.name.trim()) {
      toast({ title: "Validation Error", description: "Business name is required.", variant: "destructive" });
      return;
    }
    toast({ title: "Profile Saved", description: "Business profile has been updated." });
  };

  const handleSaveTax = () => {
    toast({ title: "Tax Settings Saved", description: "Tax and charge settings have been updated." });
  };

  const handleSavePayment = () => {
    toast({ title: "Payment Settings Saved", description: "Payment method preferences have been updated." });
  };

  const updateProfile = (field: string, value: string) => setProfile((prev) => ({ ...prev, [field]: value }));

  // Calculate receipt preview
  const subtotal = 100000;
  const scAmount = serviceChargeEnabled ? subtotal * (serviceChargeRate / 100) : 0;
  const taxAmount = taxEnabled ? (subtotal + scAmount) * (taxRate / 100) : 0;
  const total = subtotal + scAmount + taxAmount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Business Settings</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">Configure your business profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-[hsl(var(--admin-background))] border border-[hsl(var(--admin-border))]">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]">Business Profile</TabsTrigger>
          <TabsTrigger value="tax" className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]">Tax & Charges</TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Business Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-[hsl(var(--admin-border))] flex flex-col items-center justify-center gap-2 bg-[hsl(var(--admin-background))]">
                  <Upload className="w-8 h-8 text-[hsl(var(--admin-muted-foreground))]" />
                  <span className="text-xs text-[hsl(var(--admin-muted-foreground))]">Upload Logo</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Business Name</Label>
                    <Input value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Tagline</Label>
                    <Input value={profile.tagline} onChange={(e) => updateProfile("tagline", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Business Email</Label>
                  <Input type="email" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                  <Input value={profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Business Address</Label>
                <Textarea value={profile.address} onChange={(e) => updateProfile("address", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Tax ID (NPWP)</Label>
                  <Input value={profile.taxId} onChange={(e) => updateProfile("taxId", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Business License</Label>
                  <Input value={profile.license} onChange={(e) => updateProfile("license", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gap-2" onClick={handleSaveProfile}><Save className="w-4 h-4" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" /> Tax & Service Charges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Tax (PPN)</h4>
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Apply tax to all transactions</p>
                  </div>
                  <Switch checked={taxEnabled} onCheckedChange={setTaxEnabled} />
                </div>
                {taxEnabled && (
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Tax Rate (%)</Label>
                    <Input type="number" value={taxRate} onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)} className="w-32 bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                  </div>
                )}
              </div>
              <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Service Charge</h4>
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Add service charge to bills</p>
                  </div>
                  <Switch checked={serviceChargeEnabled} onCheckedChange={setServiceChargeEnabled} />
                </div>
                {serviceChargeEnabled && (
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Service Charge (%)</Label>
                    <Input type="number" value={serviceChargeRate} onChange={(e) => setServiceChargeRate(parseInt(e.target.value) || 0)} className="w-32 bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
                  </div>
                )}
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium text-[hsl(var(--admin-card-foreground))] mb-2">Receipt Preview</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                    <span>Subtotal</span><span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  {serviceChargeEnabled && (
                    <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                      <span>Service Charge ({serviceChargeRate}%)</span><span>Rp {scAmount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {taxEnabled && (
                    <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                      <span>Tax ({taxRate}%)</span><span>Rp {Math.round(taxAmount).toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[hsl(var(--admin-card-foreground))] pt-2 border-t border-[hsl(var(--admin-border))]">
                    <span>Total</span><span>Rp {Math.round(total).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gap-2" onClick={handleSaveTax}><Save className="w-4 h-4" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "cash", label: "Cash", desc: "Accept cash payments", icon: "$", color: "green" },
                  { key: "card", label: "Debit/Credit Card", desc: "EDC terminal payments", icon: "card", color: "blue" },
                  { key: "qris", label: "QRIS", desc: "QR code payments", icon: "QR", color: "orange" },
                  { key: "transfer", label: "Bank Transfer", desc: "Direct bank transfers", icon: "TF", color: "purple" },
                ].map((method) => (
                  <div key={method.key} className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${method.color}-100 flex items-center justify-center`}>
                          {method.icon === "card" ? (
                            <CreditCard className={`w-5 h-5 text-${method.color}-700`} />
                          ) : (
                            <span className={`text-${method.color}-700 font-bold text-sm`}>{method.icon}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">{method.label}</h4>
                          <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{method.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={payments[method.key as keyof typeof payments]}
                        onCheckedChange={(checked) => setPayments((prev) => ({ ...prev, [method.key]: checked }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <Button className="gap-2" onClick={handleSavePayment}><Save className="w-4 h-4" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
