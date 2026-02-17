import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, DollarSign, AlertTriangle, CheckCircle, Clock, Receipt } from "lucide-react";
import { AdminPagination } from "@/components/admin/AdminPagination";

type PaymentStatus = "paid" | "overdue" | "pending" | "failed";

interface BillingRecord {
  id: string;
  tenant: string;
  email: string;
  plan: string;
  amount: string;
  status: PaymentStatus;
  dueDate: string;
  lastPayment: string;
}

interface BillingHistoryEntry {
  date: string;
  description: string;
  amount: string;
  status: PaymentStatus;
}

const billingRecords: BillingRecord[] = [
  { id: "1", tenant: "Barbershop Elang Jaya", email: "owner@elangjaya.com", plan: "Professional", amount: "Rp 229.000", status: "paid", dueDate: "2026-02-15", lastPayment: "2026-01-15" },
  { id: "2", tenant: "Studio Gaya Urban", email: "contact@gayaurban.com", plan: "Enterprise", amount: "Rp 299.000", status: "paid", dueDate: "2026-03-01", lastPayment: "2026-02-01" },
  { id: "3", tenant: "Pangkas Klasik", email: "info@pangkasklasik.com", plan: "Starter", amount: "Rp 149.000", status: "overdue", dueDate: "2026-01-14", lastPayment: "2025-12-14" },
  { id: "4", tenant: "Barbershop Pria Sejati", email: "hello@priasejati.com", plan: "Professional", amount: "Rp 229.000", status: "failed", dueDate: "2026-01-01", lastPayment: "2025-11-01" },
  { id: "5", tenant: "Fresh Fades Lounge", email: "book@freshfades.com", plan: "Starter", amount: "Rp 149.000", status: "pending", dueDate: "2026-02-15", lastPayment: "2026-01-15" },
  { id: "6", tenant: "Royal Cuts", email: "info@royalcuts.com", plan: "Professional", amount: "Rp 229.000", status: "paid", dueDate: "2026-02-01", lastPayment: "2026-01-01" },
  { id: "7", tenant: "Modern Man Grooming", email: "contact@modernman.com", plan: "Starter", amount: "Rp 149.000", status: "overdue", dueDate: "2026-01-24", lastPayment: "2025-12-24" },
];

const billingHistory: Record<string, BillingHistoryEntry[]> = {
  "1": [
    { date: "2026-01-15", description: "Monthly subscription", amount: "Rp 229.000", status: "paid" },
    { date: "2025-12-15", description: "Monthly subscription", amount: "Rp 229.000", status: "paid" },
    { date: "2025-11-15", description: "Monthly subscription", amount: "Rp 229.000", status: "paid" },
  ],
  "3": [
    { date: "2025-12-14", description: "Monthly subscription", amount: "Rp 149.000", status: "paid" },
    { date: "2025-11-14", description: "Monthly subscription", amount: "Rp 149.000", status: "paid" },
  ],
  "4": [
    { date: "2025-12-01", description: "Monthly subscription", amount: "Rp 229.000", status: "failed" },
    { date: "2025-11-01", description: "Monthly subscription", amount: "Rp 229.000", status: "paid" },
  ],
};

const ITEMS_PER_PAGE = 5;

const stats = [
  { title: "Total Revenue", value: "Rp 24.580.000", icon: DollarSign, color: "text-green-600" },
  { title: "Overdue Payments", value: "3", icon: AlertTriangle, color: "text-orange-500" },
  { title: "Paid This Month", value: "42", icon: CheckCircle, color: "text-green-500" },
  { title: "Pending", value: "5", icon: Clock, color: "text-yellow-500" },
];

const getStatusBadge = (status: PaymentStatus) => {
  const map: Record<PaymentStatus, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    paid: { variant: "default", label: "Paid" },
    pending: { variant: "secondary", label: "Pending" },
    overdue: { variant: "destructive", label: "Overdue" },
    failed: { variant: "destructive", label: "Failed" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
};

export default function BillingMonitor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({ type: "credit", amount: "", reason: "" });

  const filtered = billingRecords.filter(
    (r) =>
      r.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Billing Monitor</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Track tenant payments, billing history, and manual adjustments</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
            <Input
              placeholder="Search tenants by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
            <Receipt className="w-5 h-5 text-primary" />
            Payment Status ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Tenant</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Plan</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Amount</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Due Date</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Last Payment</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((record) => (
                <TableRow key={record.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{record.tenant}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{record.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.plan}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))] font-medium">{record.amount}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.dueDate}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.lastPayment}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRecord(record)}
                      className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedRecord(record); setAdjustmentOpen(true); }}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardContent>
      </Card>

      {/* Billing History Dialog */}
      <Dialog open={!!selectedRecord && !adjustmentOpen} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              Billing History — {selectedRecord?.tenant}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {(billingHistory[selectedRecord?.id || ""] || []).length > 0 ? (
              (billingHistory[selectedRecord?.id || ""] || []).map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--admin-muted))]">
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--admin-card-foreground))]">{entry.description}</p>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{entry.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">{entry.amount}</span>
                    {getStatusBadge(entry.status)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))] text-center py-4">No billing history available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Adjustment Dialog */}
      <Dialog open={adjustmentOpen} onOpenChange={(open) => { setAdjustmentOpen(open); if (!open) setSelectedRecord(null); }}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              Manual Adjustment — {selectedRecord?.tenant}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Adjustment Type</Label>
              <Select value={adjustmentData.type} onValueChange={(v) => setAdjustmentData({ ...adjustmentData, type: v })}>
                <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                  <SelectItem value="credit" className="text-[hsl(var(--admin-card-foreground))]">Credit</SelectItem>
                  <SelectItem value="debit" className="text-[hsl(var(--admin-card-foreground))]">Debit</SelectItem>
                  <SelectItem value="refund" className="text-[hsl(var(--admin-card-foreground))]">Refund</SelectItem>
                  <SelectItem value="waiver" className="text-[hsl(var(--admin-card-foreground))]">Waiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Amount</Label>
              <Input
                placeholder="Rp 0"
                value={adjustmentData.amount}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, amount: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Reason</Label>
              <Textarea
                placeholder="Reason for adjustment..."
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setAdjustmentOpen(false); setSelectedRecord(null); }} className="text-[hsl(var(--admin-muted-foreground))]">
              Cancel
            </Button>
            <Button onClick={() => { setAdjustmentOpen(false); setSelectedRecord(null); setAdjustmentData({ type: "credit", amount: "", reason: "" }); }}>
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
