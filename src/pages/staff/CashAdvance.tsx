import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Banknote, Receipt, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: string;
  date: string;
  type: "Cash Advance" | "Reimbursement";
  amount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: string;
}

const CashAdvance = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState<"Cash Advance" | "Reimbursement">("Cash Advance");
  const [form, setForm] = useState({ amount: "", reason: "" });

  const [requests, setRequests] = useState<Request[]>([
    { id: "CA001", date: "2026-02-14", type: "Cash Advance", amount: 500000, reason: "Transportation emergency", status: "Approved", approvedBy: "Manager" },
    { id: "CA002", date: "2026-02-10", type: "Reimbursement", amount: 150000, reason: "Cleaning supplies purchase", status: "Pending" },
    { id: "CA003", date: "2026-02-05", type: "Cash Advance", amount: 300000, reason: "Medical needs", status: "Rejected" },
    { id: "CA004", date: "2026-01-28", type: "Reimbursement", amount: 250000, reason: "Equipment repair", status: "Approved", approvedBy: "Manager" },
  ]);

  const handleSubmit = () => {
    if (!form.amount || !form.reason) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    const newRequest: Request = {
      id: `CA${String(requests.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      type: requestType,
      amount: parseInt(form.amount),
      reason: form.reason,
      status: "Pending",
    };
    setRequests([newRequest, ...requests]);
    setForm({ amount: "", reason: "" });
    setIsDialogOpen(false);
    toast({ title: "Submitted", description: `${requestType} request submitted successfully.` });
  };

  const handleExport = () => {
    const headers = ["ID", "Date", "Type", "Amount", "Reason", "Status"];
    const rows = requests.map(r => [r.id, r.date, r.type, r.amount, `"${r.reason}"`, r.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "cash-advance-reimbursement.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Data exported as CSV." });
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      Pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      Approved: "bg-green-500/10 text-green-600 border-green-500/20",
      Rejected: "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return map[status] || "";
  };

  const pendingCount = requests.filter(r => r.status === "Pending").length;
  const approvedTotal = requests.filter(r => r.status === "Approved").reduce((s, r) => s + r.amount, 0);

  const cashAdvances = requests.filter(r => r.type === "Cash Advance");
  const reimbursements = requests.filter(r => r.type === "Reimbursement");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Cash Advance & Reimbursement</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Submit and track your requests.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> New Request
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10"><Banknote className="w-5 h-5 text-yellow-600" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Pending Requests</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10"><Receipt className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Total Approved</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">Rp {approvedTotal.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><Banknote className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Total Requests</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{requests.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
          <TabsTrigger value="advance">Cash Advance ({cashAdvances.length})</TabsTrigger>
          <TabsTrigger value="reimbursement">Reimbursement ({reimbursements.length})</TabsTrigger>
        </TabsList>

        {["all", "advance", "reimbursement"].map(tab => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[hsl(var(--admin-border))]">
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">ID</TableHead>
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Date</TableHead>
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Type</TableHead>
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Amount</TableHead>
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Reason</TableHead>
                      <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(tab === "all" ? requests : tab === "advance" ? cashAdvances : reimbursements).map(r => (
                      <TableRow key={r.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                        <TableCell className="text-[hsl(var(--admin-card-foreground))] font-mono">{r.id}</TableCell>
                        <TableCell className="text-[hsl(var(--admin-card-foreground))]">{r.date}</TableCell>
                        <TableCell><Badge variant="outline">{r.type}</Badge></TableCell>
                        <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {r.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-[hsl(var(--admin-card-foreground))] max-w-[200px] truncate">{r.reason}</TableCell>
                        <TableCell><Badge className={getStatusBadge(r.status)}>{r.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* New Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">New Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Type</Label>
              <Select value={requestType} onValueChange={(v) => setRequestType(v as any)}>
                <SelectTrigger className="border-[hsl(var(--admin-border))]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash Advance">Cash Advance</SelectItem>
                  <SelectItem value="Reimbursement">Reimbursement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Amount (Rp)</Label>
              <Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="border-[hsl(var(--admin-border))]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Reason</Label>
              <Textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} className="border-[hsl(var(--admin-border))]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">Cancel</Button>
            <Button onClick={handleSubmit}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashAdvance;
