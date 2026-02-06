import { useState } from "react";
import { FileText, Download, Calendar, Building2, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockFinancialData = [
  { month: "January 2025", revenue: 48500000, expenses: 18200000, profit: 30300000 },
  { month: "December 2024", revenue: 52300000, expenses: 19800000, profit: 32500000 },
  { month: "November 2024", revenue: 45600000, expenses: 17500000, profit: 28100000 },
  { month: "October 2024", revenue: 43200000, expenses: 16800000, profit: 26400000 },
  { month: "September 2024", revenue: 41800000, expenses: 16200000, profit: 25600000 },
];

export default function FinancialReports() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = mockFinancialData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = mockFinancialData.reduce((sum, d) => sum + d.expenses, 0);
  const totalProfit = mockFinancialData.reduce((sum, d) => sum + d.profit, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Financial Reports
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Revenue, expenses, and profit analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="central">Central Branch</SelectItem>
              <SelectItem value="west">West Branch</SelectItem>
              <SelectItem value="east">East Branch</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Revenue
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Last 5 months</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Expenses
            </CardTitle>
            <TrendingDown className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalExpenses)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Last 5 months</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Net Profit
            </CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalProfit)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
              {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Monthly Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Period</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Revenue</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Expenses</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Profit</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFinancialData.map((row) => (
                <TableRow
                  key={row.month}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                    {row.month}
                  </TableCell>
                  <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                    {formatCurrency(row.revenue)}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    {formatCurrency(row.expenses)}
                  </TableCell>
                  <TableCell className="text-right text-primary font-medium">
                    {formatCurrency(row.profit)}
                  </TableCell>
                  <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                    {((row.profit / row.revenue) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
