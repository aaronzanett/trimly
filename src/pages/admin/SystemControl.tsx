import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Settings, Shield, AlertTriangle, Power, Pause, Play, Building2 } from "lucide-react";
import { AdminPagination } from "@/components/admin/AdminPagination";

type TenantStatus = "active" | "suspended";

interface TenantControl {
  id: string;
  name: string;
  email: string;
  status: TenantStatus;
  plan: string;
  suspendedAt?: string;
  suspendReason?: string;
}

const tenantsData: TenantControl[] = [
  { id: "1", name: "Elite Cuts Barbershop", email: "owner@elitecuts.com", status: "active", plan: "Professional" },
  { id: "2", name: "Urban Style Studio", email: "contact@urbanstyle.com", status: "active", plan: "Enterprise" },
  { id: "3", name: "Classic Barbers", email: "info@classicbarbers.com", status: "active", plan: "Starter" },
  { id: "4", name: "The Gentleman's Corner", email: "hello@gentlemanscorner.com", status: "suspended", plan: "Professional", suspendedAt: "2026-01-15", suspendReason: "Non-payment" },
  { id: "5", name: "Fresh Fades Lounge", email: "book@freshfades.com", status: "active", plan: "Starter" },
  { id: "6", name: "Royal Cuts", email: "info@royalcuts.com", status: "active", plan: "Professional" },
  { id: "7", name: "Modern Man Grooming", email: "contact@modernman.com", status: "suspended", plan: "Starter", suspendedAt: "2026-02-01", suspendReason: "Terms violation" },
];

interface GlobalConfig {
  maintenanceMode: boolean;
  newRegistrations: boolean;
  trialDays: string;
  maxBranchesStarter: string;
  maxBranchesPro: string;
  maxBranchesEnterprise: string;
  defaultCurrency: string;
}

const ITEMS_PER_PAGE = 5;

export default function SystemControl() {
  const [config, setConfig] = useState<GlobalConfig>({
    maintenanceMode: false,
    newRegistrations: true,
    trialDays: "14",
    maxBranchesStarter: "2",
    maxBranchesPro: "10",
    maxBranchesEnterprise: "Unlimited",
    defaultCurrency: "USD",
  });

  const [tenants, setTenants] = useState(tenantsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [suspendDialog, setSuspendDialog] = useState<{ open: boolean; tenant: TenantControl | null; reason: string }>({ open: false, tenant: null, reason: "" });
  const [confirmMaintenance, setConfirmMaintenance] = useState(false);

  const filtered = tenants.filter(
    (t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSuspend = (tenant: TenantControl) => {
    setSuspendDialog({ open: true, tenant, reason: "" });
  };

  const confirmSuspend = () => {
    if (suspendDialog.tenant) {
      setTenants((prev) =>
        prev.map((t) =>
          t.id === suspendDialog.tenant!.id
            ? { ...t, status: "suspended" as TenantStatus, suspendedAt: new Date().toISOString().split("T")[0], suspendReason: suspendDialog.reason }
            : t
        )
      );
    }
    setSuspendDialog({ open: false, tenant: null, reason: "" });
  };

  const handleResume = (tenantId: string) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId ? { ...t, status: "active" as TenantStatus, suspendedAt: undefined, suspendReason: undefined } : t
      )
    );
  };

  const handleMaintenanceToggle = () => {
    if (!config.maintenanceMode) {
      setConfirmMaintenance(true);
    } else {
      setConfig({ ...config, maintenanceMode: false });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">System Control</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Global configuration, maintenance mode, and tenant management</p>
      </div>

      {/* Global Configuration */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
              <Settings className="w-5 h-5 text-primary" />
              Global Configuration
            </CardTitle>
            <CardDescription className="text-[hsl(var(--admin-muted-foreground))]">Platform-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[hsl(var(--admin-card-foreground))]">New Registrations</Label>
                <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Allow new tenant signups</p>
              </div>
              <Switch checked={config.newRegistrations} onCheckedChange={(v) => setConfig({ ...config, newRegistrations: v })} />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Trial Duration (days)</Label>
              <Input
                value={config.trialDays}
                onChange={(e) => setConfig({ ...config, trialDays: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Default Currency</Label>
              <Select value={config.defaultCurrency} onValueChange={(v) => setConfig({ ...config, defaultCurrency: v })}>
                <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                  <SelectItem value="USD" className="text-[hsl(var(--admin-card-foreground))]">USD ($)</SelectItem>
                  <SelectItem value="EUR" className="text-[hsl(var(--admin-card-foreground))]">EUR (€)</SelectItem>
                  <SelectItem value="GBP" className="text-[hsl(var(--admin-card-foreground))]">GBP (£)</SelectItem>
                  <SelectItem value="MYR" className="text-[hsl(var(--admin-card-foreground))]">MYR (RM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Maintenance Mode */}
          <Card className={`border-[hsl(var(--admin-border))] ${config.maintenanceMode ? "bg-orange-50 border-orange-200" : "bg-[hsl(var(--admin-card))]"}`}>
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
                <AlertTriangle className={`w-5 h-5 ${config.maintenanceMode ? "text-orange-500" : "text-[hsl(var(--admin-muted-foreground))]"}`} />
                Maintenance Mode
              </CardTitle>
              <CardDescription className="text-[hsl(var(--admin-muted-foreground))]">
                {config.maintenanceMode ? "Platform is currently in maintenance mode" : "Platform is operating normally"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power className={`w-4 h-4 ${config.maintenanceMode ? "text-orange-500" : "text-green-500"}`} />
                  <span className="text-sm font-medium text-[hsl(var(--admin-card-foreground))]">
                    {config.maintenanceMode ? "Maintenance Active" : "System Online"}
                  </span>
                </div>
                <Switch checked={config.maintenanceMode} onCheckedChange={handleMaintenanceToggle} />
              </div>
            </CardContent>
          </Card>

          {/* Branch Limits */}
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
                <Shield className="w-5 h-5 text-primary" />
                Plan Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Starter — Max Branches", value: config.maxBranchesStarter, key: "maxBranchesStarter" },
                { label: "Professional — Max Branches", value: config.maxBranchesPro, key: "maxBranchesPro" },
                { label: "Enterprise — Max Branches", value: config.maxBranchesEnterprise, key: "maxBranchesEnterprise" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <Label className="text-sm text-[hsl(var(--admin-card-foreground))] whitespace-nowrap">{item.label}</Label>
                  <Input
                    value={item.value}
                    onChange={(e) => setConfig({ ...config, [item.key]: e.target.value })}
                    className="w-24 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tenant Suspension/Resume */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
            <Building2 className="w-5 h-5 text-primary" />
            Tenant Suspension / Resume ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
            <Input
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-10 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))]"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Tenant</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Plan</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Reason</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((tenant) => (
                <TableRow key={tenant.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{tenant.name}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{tenant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{tenant.plan}</TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === "active" ? "default" : "destructive"}>
                      {tenant.status === "active" ? "Active" : "Suspended"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-muted-foreground))] text-sm">
                    {tenant.suspendReason || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {tenant.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuspend(tenant)}
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResume(tenant.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardContent>
      </Card>

      {/* Suspend Confirmation Dialog */}
      <Dialog open={suspendDialog.open} onOpenChange={(open) => { if (!open) setSuspendDialog({ open: false, tenant: null, reason: "" }); }}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              Suspend Tenant
            </DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">
              This will immediately suspend <strong>{suspendDialog.tenant?.name}</strong> and restrict their access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-[hsl(var(--admin-card-foreground))]">Reason for suspension</Label>
            <Textarea
              placeholder="Enter reason..."
              value={suspendDialog.reason}
              onChange={(e) => setSuspendDialog({ ...suspendDialog, reason: e.target.value })}
              className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSuspendDialog({ open: false, tenant: null, reason: "" })} className="text-[hsl(var(--admin-muted-foreground))]">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmSuspend}>
              Confirm Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Mode Confirmation */}
      <Dialog open={confirmMaintenance} onOpenChange={setConfirmMaintenance}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              Enable Maintenance Mode?
            </DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">
              This will make the platform temporarily unavailable for all tenants. Only admins will be able to access the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmMaintenance(false)} className="text-[hsl(var(--admin-muted-foreground))]">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => { setConfig({ ...config, maintenanceMode: true }); setConfirmMaintenance(false); }}
            >
              Enable Maintenance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
