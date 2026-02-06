import { useState } from "react";
import {
  Wallet,
  ArrowRightLeft,
  Plus,
  Minus,
  Building2,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface BranchBalance {
  id: string;
  name: string;
  cashBalance: number;
  bankBalance: number;
  lastUpdated: string;
}

interface Transaction {
  id: string;
  date: string;
  type: "income" | "expense" | "transfer" | "adjustment";
  description: string;
  amount: number;
  branch: string;
}

const mockBranchBalances: BranchBalance[] = [
  { id: "1", name: "Central Branch", cashBalance: 4500000, bankBalance: 25000000, lastUpdated: "2025-01-15 14:30" },
  { id: "2", name: "West Branch", cashBalance: 3200000, bankBalance: 18500000, lastUpdated: "2025-01-15 14:15" },
  { id: "3", name: "East Branch", cashBalance: 2800000, bankBalance: 15200000, lastUpdated: "2025-01-15 13:45" },
  { id: "4", name: "South Branch", cashBalance: 1500000, bankBalance: 8900000, lastUpdated: "2025-01-15 12:00" },
];

const mockTransactions: Transaction[] = [
  { id: "1", date: "2025-01-15", type: "income", description: "Daily sales revenue", amount: 2450000, branch: "Central Branch" },
  { id: "2", date: "2025-01-15", type: "expense", description: "Product restocking - Pomade", amount: -850000, branch: "Central Branch" },
  { id: "3", date: "2025-01-15", type: "transfer", description: "Cash transfer to West Branch", amount: -500000, branch: "Central Branch" },
  { id: "4", date: "2025-01-14", type: "income", description: "Daily sales revenue", amount: 1890000, branch: "West Branch" },
  { id: "5", date: "2025-01-14", type: "adjustment", description: "Cash count adjustment", amount: -25000, branch: "East Branch" },
  { id: "6", date: "2025-01-14", type: "expense", description: "Utility payment", amount: -450000, branch: "Central Branch" },
  { id: "7", date: "2025-01-13", type: "income", description: "Daily sales revenue", amount: 2100000, branch: "Central Branch" },
];

const ITEMS_PER_PAGE = 5;

export default function BusinessFinance() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalCash = mockBranchBalances.reduce((sum, b) => sum + b.cashBalance, 0);
  const totalBank = mockBranchBalances.reduce((sum, b) => sum + b.bankBalance, 0);

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "expense":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      case "transfer":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "adjustment":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Business Finance
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Manage balances and track financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
                <ArrowRightLeft className="w-4 h-4" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <DialogHeader>
                <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                  Cash Transfer Between Branches
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">From Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <SelectItem value="central">Central Branch</SelectItem>
                        <SelectItem value="west">West Branch</SelectItem>
                        <SelectItem value="east">East Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">To Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <SelectItem value="central">Central Branch</SelectItem>
                        <SelectItem value="west">West Branch</SelectItem>
                        <SelectItem value="east">East Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Notes</Label>
                  <Textarea
                    placeholder="Add transfer notes..."
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsTransferOpen(false)}
                    className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsTransferOpen(false)}>Confirm Transfer</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Adjustment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <DialogHeader>
                <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                  Balance Adjustment
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Branch</Label>
                  <Select>
                    <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                      <SelectItem value="central">Central Branch</SelectItem>
                      <SelectItem value="west">West Branch</SelectItem>
                      <SelectItem value="east">East Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Type</Label>
                    <Select>
                      <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <SelectItem value="add">Add (+)</SelectItem>
                        <SelectItem value="subtract">Subtract (-)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[hsl(var(--admin-card-foreground))]">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Reason</Label>
                  <Textarea
                    placeholder="Explain the adjustment reason..."
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAdjustmentOpen(false)}
                    className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAdjustmentOpen(false)}>Apply Adjustment</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Total Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Cash (All Branches)
            </CardTitle>
            <Wallet className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalCash)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Bank (All Branches)
            </CardTitle>
            <Building2 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalBank)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Balances */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
            Branch Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockBranchBalances.map((branch) => (
              <div
                key={branch.id}
                className="p-4 rounded-lg border border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-background))]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-[hsl(var(--admin-card-foreground))]">
                    {branch.name}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--admin-muted-foreground))]">Cash</span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(branch.cashBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--admin-muted-foreground))]">Bank</span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(branch.bankBalance)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[hsl(var(--admin-muted-foreground))] mt-3">
                  Updated: {branch.lastUpdated}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
              Transaction History
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Date</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Type</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Description</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {new Date(tx.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getTypeBadgeStyle(tx.type)}>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {tx.description}
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {tx.branch}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-medium flex items-center justify-end gap-1 ${
                        tx.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.amount >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {formatCurrency(Math.abs(tx.amount))}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
