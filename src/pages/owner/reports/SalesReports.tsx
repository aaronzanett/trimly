import { useState } from "react";
import { TrendingUp, Download, Calendar, ShoppingBag, Scissors } from "lucide-react";
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

const mockSalesData = {
  topServices: [
    { name: "Regular Haircut", sales: 342, revenue: 17100000, branch: "central" },
    { name: "Premium Haircut", sales: 186, revenue: 15810000, branch: "west" },
    { name: "Beard Trim", sales: 158, revenue: 5530000, branch: "central" },
    { name: "Hair Coloring", sales: 45, revenue: 6750000, branch: "east" },
    { name: "Hair Treatment", sales: 38, revenue: 4560000, branch: "west" },
  ],
  topProducts: [
    { name: "Premium Pomade", sales: 48, revenue: 4080000, branch: "central" },
    { name: "Hair Wax", sales: 35, revenue: 2625000, branch: "west" },
    { name: "Beard Oil", sales: 28, revenue: 2660000, branch: "east" },
    { name: "Shampoo", sales: 42, revenue: 2310000, branch: "central" },
    { name: "Hair Tonic", sales: 22, revenue: 1430000, branch: "west" },
  ],
  dailySales: [
    { date: "15 Jan 2025", services: 45, products: 12, total: 3850000, branch: "central" },
    { date: "14 Jan 2025", services: 52, products: 8, total: 4120000, branch: "west" },
    { date: "13 Jan 2025", services: 38, products: 15, total: 3450000, branch: "central" },
    { date: "12 Jan 2025", services: 61, products: 10, total: 4890000, branch: "east" },
    { date: "11 Jan 2025", services: 48, products: 7, total: 3680000, branch: "west" },
  ],
};

export default function SalesReports() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filterByBranch = <T extends { branch: string }>(data: T[]) =>
    selectedBranch === "all" ? data : data.filter((d) => d.branch === selectedBranch);

  const filteredServices = filterByBranch(mockSalesData.topServices);
  const filteredProducts = filterByBranch(mockSalesData.topProducts);
  const filteredDaily = filterByBranch(mockSalesData.dailySales);

  const totalServiceRevenue = filteredServices.reduce((sum, s) => sum + s.revenue, 0);
  const totalProductRevenue = filteredProducts.reduce((sum, p) => sum + p.revenue, 0);

  const handleExport = () => {
    const headers = ["Date", "Services", "Products", "Total Revenue"];
    const rows = filteredDaily.map((d) => [d.date, d.services, d.products, d.total]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Sales Reports
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Service and product sales analysis
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Service Sales
            </CardTitle>
            <Scissors className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalServiceRevenue)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
              {filteredServices.reduce((sum, s) => sum + s.sales, 0)} services completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Product Sales
            </CardTitle>
            <ShoppingBag className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalProductRevenue)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
              {filteredProducts.reduce((sum, p) => sum + p.sales, 0)} products sold
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
              <Scissors className="w-5 h-5 text-primary" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Service</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Sales</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service, index) => (
                  <TableRow
                    key={service.name}
                    className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                  >
                    <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0 border-primary text-primary">
                          {index + 1}
                        </Badge>
                        {service.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {service.sales}
                    </TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(service.revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Product</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Sales</TableHead>
                  <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.name}
                    className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                  >
                    <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0 border-primary text-primary">
                          {index + 1}
                        </Badge>
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {product.sales}
                    </TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(product.revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Daily Sales */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Daily Sales Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Date</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Services</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Products</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDaily.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-[hsl(var(--admin-muted-foreground))] py-8">
                    No data for selected branch
                  </TableCell>
                </TableRow>
              ) : (
                filteredDaily.map((day) => (
                  <TableRow
                    key={day.date}
                    className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                  >
                    <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {day.date}
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {day.services}
                    </TableCell>
                    <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                      {day.products}
                    </TableCell>
                    <TableCell className="text-right text-primary font-medium">
                      {formatCurrency(day.total)}
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
