import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, FileText, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommissionSalary = () => {
  const { toast } = useToast();
  const [monthFilter, setMonthFilter] = useState("february");
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);

  const commissionDetails = [
    { id: "1", date: "2026-02-14", service: "Haircut", customer: "Andi", amount: 50000, commission: 15000, rate: "30%" },
    { id: "2", date: "2026-02-14", service: "Beard Trim", customer: "Bambang", amount: 30000, commission: 9000, rate: "30%" },
    { id: "3", date: "2026-02-13", service: "Hair Color", customer: "Cahyo", amount: 150000, commission: 37500, rate: "25%" },
    { id: "4", date: "2026-02-13", service: "Haircut", customer: "Dedi", amount: 50000, commission: 15000, rate: "30%" },
    { id: "5", date: "2026-02-12", service: "Shave", customer: "Eko", amount: 35000, commission: 10500, rate: "30%" },
  ];

  const salaryHistory = [
    { id: "1", month: "January 2026", baseSalary: 3000000, commission: 1850000, bonus: 200000, deductions: 150000, netSalary: 4900000, status: "Paid" },
    { id: "2", month: "December 2025", baseSalary: 3000000, commission: 2100000, bonus: 0, deductions: 150000, netSalary: 4950000, status: "Paid" },
    { id: "3", month: "November 2025", baseSalary: 3000000, commission: 1750000, bonus: 500000, deductions: 150000, netSalary: 5100000, status: "Paid" },
  ];

  const currentMonthCommission = commissionDetails.reduce((sum, c) => sum + c.commission, 0);
  const currentMonthServices = commissionDetails.length;

  const handleExport = () => {
    const headers = ["Date", "Service", "Customer", "Amount", "Commission", "Rate"];
    const rows = commissionDetails.map(c => [c.date, c.service, c.customer, c.amount, c.commission, c.rate]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "commission-details.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Commission details exported." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Commission & Salary</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">View your commission details and salary history.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><DollarSign className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">This Month Commission</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">Rp {currentMonthCommission.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10"><TrendingUp className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Services Completed</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{currentMonthServices}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><FileText className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Last Salary</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">Rp {salaryHistory[0]?.netSalary.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="commission">
        <TabsList>
          <TabsTrigger value="commission">Commission Details</TabsTrigger>
          <TabsTrigger value="salary">Salary History</TabsTrigger>
        </TabsList>

        <TabsContent value="commission">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Commission Details</CardTitle>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-40 border-[hsl(var(--admin-border))]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="february">February 2026</SelectItem>
                  <SelectItem value="january">January 2026</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[hsl(var(--admin-border))]">
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Date</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Service</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Customer</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Amount</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Rate</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionDetails.map(c => (
                    <TableRow key={c.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{c.date}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{c.service}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">{c.customer}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {c.amount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="outline">{c.rate}</Badge></TableCell>
                      <TableCell className="text-primary font-medium">Rp {c.commission.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Salary History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[hsl(var(--admin-border))]">
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Month</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Base Salary</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Commission</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Bonus</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Deductions</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Net Salary</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Payslip</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryHistory.map(s => (
                    <TableRow key={s.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                      <TableCell className="text-[hsl(var(--admin-card-foreground))] font-medium">{s.month}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {s.baseSalary.toLocaleString()}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {s.commission.toLocaleString()}</TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">Rp {s.bonus.toLocaleString()}</TableCell>
                      <TableCell className="text-red-500">-Rp {s.deductions.toLocaleString()}</TableCell>
                      <TableCell className="text-primary font-bold">Rp {s.netSalary.toLocaleString()}</TableCell>
                      <TableCell><Badge className="bg-green-500/10 text-green-600 border-green-500/20">{s.status}</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedPayslip(s)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payslip Dialog */}
      <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">Payslip - {selectedPayslip?.month}</DialogTitle>
          </DialogHeader>
          {selectedPayslip && (
            <div className="space-y-3 p-4 rounded-lg bg-[hsl(var(--admin-background))] border border-[hsl(var(--admin-border))]">
              <div className="text-center border-b border-[hsl(var(--admin-border))] pb-3">
                <h3 className="font-display text-lg font-bold text-primary">Trimly Barbershop</h3>
                <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Pay Slip - {selectedPayslip.month}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]"><span>Base Salary</span><span>Rp {selectedPayslip.baseSalary.toLocaleString()}</span></div>
                <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]"><span>Commission</span><span>Rp {selectedPayslip.commission.toLocaleString()}</span></div>
                <div className="flex justify-between text-[hsl(var(--admin-card-foreground))]"><span>Bonus</span><span>Rp {selectedPayslip.bonus.toLocaleString()}</span></div>
                <div className="flex justify-between text-red-500"><span>Deductions</span><span>-Rp {selectedPayslip.deductions.toLocaleString()}</span></div>
                <div className="border-t border-[hsl(var(--admin-border))] pt-2 flex justify-between text-lg font-bold text-primary">
                  <span>Net Salary</span><span>Rp {selectedPayslip.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommissionSalary;
