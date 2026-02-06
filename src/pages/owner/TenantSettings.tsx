import { useState } from "react";
import { Settings, Upload, Save, CreditCard, Receipt, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TenantSettings() {
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
          Business Settings
        </h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">
          Configure your business profile and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-[hsl(var(--admin-background))] border border-[hsl(var(--admin-border))]">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Business Profile
          </TabsTrigger>
          <TabsTrigger
            value="tax"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Tax & Charges
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Business Profile
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
                    <Input
                      defaultValue="Trimly Barbershop"
                      className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Tagline</Label>
                    <Input
                      defaultValue="Premium Grooming Experience"
                      className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Business Email</Label>
                  <Input
                    type="email"
                    defaultValue="contact@trimly.com"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                  <Input
                    defaultValue="+62 21 1234567"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Business Address</Label>
                <Textarea
                  defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Tax ID (NPWP)</Label>
                  <Input
                    defaultValue="01.234.567.8-901.000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Business License</Label>
                  <Input
                    defaultValue="SIUP-12345678"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Tax & Service Charges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Tax (PPN)</h4>
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">
                      Apply tax to all transactions
                    </p>
                  </div>
                  <Switch checked={taxEnabled} onCheckedChange={setTaxEnabled} />
                </div>
                {taxEnabled && (
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Tax Rate (%)</Label>
                    <Input
                      type="number"
                      defaultValue="11"
                      className="w-32 bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Service Charge</h4>
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">
                      Add service charge to bills
                    </p>
                  </div>
                  <Switch checked={serviceChargeEnabled} onCheckedChange={setServiceChargeEnabled} />
                </div>
                {serviceChargeEnabled && (
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Service Charge (%)</Label>
                    <Input
                      type="number"
                      defaultValue="5"
                      className="w-32 bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium text-[hsl(var(--admin-card-foreground))] mb-2">
                  Receipt Preview
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                    <span>Subtotal</span>
                    <span>Rp 100,000</span>
                  </div>
                  {serviceChargeEnabled && (
                    <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                      <span>Service Charge (5%)</span>
                      <span>Rp 5,000</span>
                    </div>
                  )}
                  {taxEnabled && (
                    <div className="flex justify-between text-[hsl(var(--admin-muted-foreground))]">
                      <span>Tax (11%)</span>
                      <span>Rp 11,550</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[hsl(var(--admin-card-foreground))] pt-2 border-t border-[hsl(var(--admin-border))]">
                    <span>Total</span>
                    <span>Rp 116,550</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 font-bold text-sm">$</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Cash</h4>
                        <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                          Accept cash payments
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Debit/Credit Card</h4>
                        <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                          EDC terminal payments
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-700 font-bold text-xs">QR</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">QRIS</h4>
                        <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                          QR code payments
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-700 font-bold text-xs">TF</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">Bank Transfer</h4>
                        <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                          Direct bank transfers
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
