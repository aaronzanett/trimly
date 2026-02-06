import { useState } from "react";
import { Package, Download, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
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

const mockProductData = {
  summary: {
    totalProducts: 7,
    totalStock: 118,
    lowStockItems: 2,
    totalValue: 6892000,
  },
  products: [
    { name: "Premium Pomade", sold: 48, stock: 24, revenue: 4080000, profit: 1920000, margin: 47 },
    { name: "Hair Wax", sold: 35, stock: 18, revenue: 2625000, profit: 1295000, margin: 49 },
    { name: "Beard Oil", sold: 28, stock: 15, revenue: 2660000, profit: 1316000, margin: 49 },
    { name: "Shampoo", sold: 42, stock: 30, revenue: 2310000, profit: 1260000, margin: 55 },
    { name: "Conditioner", sold: 38, stock: 28, revenue: 2090000, profit: 1140000, margin: 55 },
    { name: "Hair Tonic", sold: 22, stock: 3, revenue: 1430000, profit: 726000, margin: 51 },
    { name: "Clay Pomade", sold: 0, stock: 0, revenue: 0, profit: 0, margin: 0 },
  ],
};

export default function ProductReports() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = mockProductData.products.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = mockProductData.products.reduce((sum, p) => sum + p.profit, 0);

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10">Out of Stock</Badge>;
    } else if (stock <= 5) {
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Low: {stock}
        </Badge>
      );
    }
    return <span className="text-[hsl(var(--admin-card-foreground))]">{stock} units</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Product Reports
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Inventory and product performance analysis
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Products
            </CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {mockProductData.summary.totalProducts}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Active SKUs</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Total Stock
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {mockProductData.summary.totalStock}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Units available</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Product Revenue
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Low Stock Alert
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {mockProductData.summary.lowStockItems}
            </div>
            <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Items need restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Product Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Product</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Sold</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Stock</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Revenue</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Profit</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProductData.products.map((product) => (
                <TableRow
                  key={product.name}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                    {product.sold}
                  </TableCell>
                  <TableCell>{getStockBadge(product.stock)}</TableCell>
                  <TableCell className="text-right text-[hsl(var(--admin-card-foreground))]">
                    {formatCurrency(product.revenue)}
                  </TableCell>
                  <TableCell className="text-right text-primary font-medium">
                    {formatCurrency(product.profit)}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.margin > 0 ? (
                      <span className="text-primary font-medium">{product.margin}%</span>
                    ) : (
                      <span className="text-[hsl(var(--admin-muted-foreground))]">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Profit Summary */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
            Profit Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[hsl(var(--admin-background))]">
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Total Revenue</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[hsl(var(--admin-background))]">
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Total Profit</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(totalProfit)}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10">
              <p className="text-sm text-primary">Average Margin</p>
              <p className="text-xl font-bold text-primary">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
