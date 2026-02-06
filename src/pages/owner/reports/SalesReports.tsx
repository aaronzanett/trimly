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
    { name: "Regular Haircut", sales: 342, revenue: 17100000 },
    { name: "Premium Haircut", sales: 186, revenue: 15810000 },
    { name: "Beard Trim", sales: 158, revenue: 5530000 },
    { name: "Hair Coloring", sales: 45, revenue: 6750000 },
    { name: "Hair Treatment", sales: 38, revenue: 4560000 },
  ],
  topProducts: [
    { name: "Premium Pomade", sales: 48, revenue: 4080000 },
    { name: "Hair Wax", sales: 35, revenue: 2625000 },
    { name: "Beard Oil", sales: 28, revenue: 2660000 },
    { name: "Shampoo", sales: 42, revenue: 2310000 },
    { name: "Hair Tonic", sales: 22, revenue: 1430000 },
  ],
  dailySales: [
    { date: "15 Jan 2025", services: 45, products: 12, total: 3850000 },
    { date: "14 Jan 2025", services: 52, products: 8, total: 4120000 },
    { date: "13 Jan 2025", services: 38, products: 15, total: 3450000 },
    { date: "12 Jan 2025", services: 61, products: 10, total: 4890000 },
    { date: "11 Jan 2025", services: 48, products: 7, total: 3680000 },
  ],
};

export default function SalesReports() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalServiceRevenue = mockSalesData.topServices.reduce((sum, s) => sum + s.revenue, 0);
  const totalProductRevenue = mockSalesData.topProducts.reduce((sum, p) => sum + p.revenue, 0);

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
              {mockSalesData.topServices.reduce((sum, s) => sum + s.sales, 0)} services completed
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
              {mockSalesData.topProducts.reduce((sum, p) => sum + p.sales, 0)} products sold
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
                {mockSalesData.topServices.map((service, index) => (
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
                {mockSalesData.topProducts.map((product, index) => (
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
              {mockSalesData.dailySales.map((day) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
