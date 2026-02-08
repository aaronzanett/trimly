import { useState } from "react";
import { Package, Plus, Edit2, Trash2, Search, MoreHorizontal, AlertTriangle } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  costOfGoods: number;
  stock: number;
  category: string;
  isActive: boolean;
}

const mockProducts: Product[] = [
  { id: "1", name: "Premium Pomade", description: "Strong hold, matte finish", price: 85000, costOfGoods: 45000, stock: 24, category: "Styling", isActive: true },
  { id: "2", name: "Hair Wax", description: "Medium hold, natural look", price: 75000, costOfGoods: 38000, stock: 18, category: "Styling", isActive: true },
  { id: "3", name: "Beard Oil", description: "Nourishing beard care oil", price: 95000, costOfGoods: 48000, stock: 15, category: "Beard Care", isActive: true },
  { id: "4", name: "Hair Tonic", description: "Strengthening hair treatment", price: 65000, costOfGoods: 32000, stock: 3, category: "Treatment", isActive: true },
  { id: "5", name: "Shampoo", description: "Daily cleansing shampoo", price: 55000, costOfGoods: 25000, stock: 30, category: "Hair Care", isActive: true },
  { id: "6", name: "Conditioner", description: "Moisturizing conditioner", price: 55000, costOfGoods: 25000, stock: 28, category: "Hair Care", isActive: true },
  { id: "7", name: "Clay Pomade", description: "Matte finish, strong hold", price: 90000, costOfGoods: 48000, stock: 0, category: "Styling", isActive: false },
];

const ITEMS_PER_PAGE = 5;

export default function Products() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "styling":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "beard care":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "treatment":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "hair care":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Out of Stock</Badge>;
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
            Products
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Manage your product inventory
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
            <DialogHeader>
              <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                Add New Product
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Product Name</Label>
                <Input
                  placeholder="Enter product name"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Description</Label>
                <Textarea
                  placeholder="Describe the product..."
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Selling Price (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="85000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Cost of Goods (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="45000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Initial Stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Category</Label>
                  <Input
                    placeholder="e.g., Styling, Hair Care"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Active</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save Product</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
              All Products
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search products..."
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
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Product</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Category</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Price</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">COGS</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Margin</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Stock</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => {
                const margin = ((product.price - product.costOfGoods) / product.price) * 100;
                return (
                  <TableRow
                    key={product.id}
                    className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-[hsl(var(--admin-card-foreground))]">
                          {product.name}
                        </p>
                        <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                          {product.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCategoryStyle(product.category)}>
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell className="text-[hsl(var(--admin-muted-foreground))]">
                      {formatCurrency(product.costOfGoods)}
                    </TableCell>
                    <TableCell>
                      <span className="text-green-600 font-medium">{margin.toFixed(0)}%</span>
                    </TableCell>
                    <TableCell>{getStockBadge(product.stock)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]"
                        >
                          <DropdownMenuItem className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
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
