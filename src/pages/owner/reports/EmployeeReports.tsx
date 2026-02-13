import { useState } from "react";
import { Users, Download, Award, Clock, TrendingUp } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockEmployeeData = [
  { name: "Ahmad Fauzi", branch: "central", services: 142, revenue: 8500000, commission: 2550000, rating: 4.9, attendance: 98 },
  { name: "Budi Santoso", branch: "west", services: 128, revenue: 7200000, commission: 2160000, rating: 4.8, attendance: 95 },
  { name: "Candra Wijaya", branch: "central", services: 115, revenue: 6800000, commission: 2040000, rating: 4.7, attendance: 100 },
  { name: "Deni Kurniawan", branch: "east", services: 98, revenue: 5900000, commission: 1770000, rating: 4.6, attendance: 92 },
  { name: "Gita Permata", branch: "east", services: 85, revenue: 4800000, commission: 1440000, rating: 4.5, attendance: 88 },
];

const branchLabels: Record<string, string> = {
  central: "Central",
  west: "West",
  east: "East",
};

export default function EmployeeReports() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredData = selectedBranch === "all"
    ? mockEmployeeData
    : mockEmployeeData.filter((e) => e.branch === selectedBranch);

  const totalServices = filteredData.reduce((sum, e) => sum + e.services, 0);
  const totalRevenue = filteredData.reduce((sum, e) => sum + e.revenue, 0);
  const avgRating = filteredData.length > 0
    ? (filteredData.reduce((sum, e) => sum + e.rating, 0) / filteredData.length).toFixed(1)
    : "0";

  const handleExport = () => {
    const headers = ["Employee", "Branch", "Services", "Revenue", "Commission", "Rating", "Attendance"];
    const rows = filteredData.map((e) => [
      e.name,
      branchLabels[e.branch] || e.branch,
      e.services,
      e.revenue,
      e.commission,
      e.rating,
      e.attendance + "%",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Employee Reports
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Team performance and productivity analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
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
          <Button onClick={handleExport} variant="outline" className="gap-2 border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Active Barbers
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {filteredData.length}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
              {selectedBranch === "all" ? "Across all branches" : branchLabels[selectedBranch] + " Branch"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Services
            </CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {totalServices}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">This month</p>
          </CardContent>
        </Card>

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
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Generated by team</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Avg Rating
            </CardTitle>
            <Award className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgRating}</div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Customer feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Employee Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Employee</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Services</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Revenue</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Commission</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Rating</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-[hsl(var(--admin-muted-foreground))] py-8">
                    No employees for selected branch
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((employee, index) => (
                  <TableRow
                    key={employee.name}
                    className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {index < 3 && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                            #{index + 1}
                          </Badge>
                        )}
                        <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                          {employee.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                      {branchLabels[employee.branch] || employee.branch}
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {employee.services}
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(employee.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(employee.commission)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-[hsl(var(--admin-card-foreground))]">{employee.rating}</span>
                        <span className="text-amber-500">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={employee.attendance} className="h-2 flex-1" />
                        <span className="text-xs text-[hsl(var(--admin-muted-foreground))] w-10">
                          {employee.attendance}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
