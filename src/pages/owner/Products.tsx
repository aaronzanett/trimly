import { useState } from "react";
import { Plus, Edit2, Trash2, Search, MoreHorizontal, AlertTriangle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { useToast } from "@/hooks/use-toast";

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

const initialProducts: Product[] = [
  { id: "1", name: "Premium Pomade", description: "Strong hold, matte finish", price: 85000, costOfGoods: 45000, stock: 24, category: "Styling", isActive: true },
  { id: "2", name: "Hair Wax", description: "Medium hold, natural look", price: 75000, costOfGoods: 38000, stock: 18, category: "Styling", isActive: true },
  { id: "3", name: "Beard Oil", description: "Nourishing beard care oil", price: 95000, costOfGoods: 48000, stock: 15, category: "Beard Care", isActive: true },
  { id: "4", name: "Hair Tonic", description: "Strengthening hair treatment", price: 65000, costOfGoods: 32000, stock: 3, category: "Treatment", isActive: true },
  { id: "5", name: "Shampoo", description: "Daily cleansing shampoo", price: 55000, costOfGoods: 25000, stock: 30, category: "Hair Care", isActive: true },
  { id: "6", name: "Conditioner", description: "Moisturizing conditioner", price: 55000, costOfGoods: 25000, stock: 28, category: "Hair Care", isActive: true },
  { id: "7", name: "Clay Pomade", description: "Matte finish, strong hold", price: 90000, costOfGoods: 48000, stock: 0, category: "Styling", isActive: false },
];

type ProductForm = { name: string; description: string; price: number; costOfGoods: number; stock: number; category: string; isActive: boolean };
const emptyForm: ProductForm = { name: "", description: "", price: 0, costOfGoods: 0, stock: 0, category: "", isActive: true };

const ITEMS_PER_PAGE = 5;

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const { toast } = useToast();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openAdd = () => { setEditingProduct(null); setForm(emptyForm); setIsDialogOpen(true); };
  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ name: p.name, description: p.description, price: p.price, costOfGoods: p.costOfGoods, stock: p.stock, category: p.category, isActive: p.isActive });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.category.trim()) {
      toast({ title: "Validation Error", description: "Name and category are required.", variant: "destructive" });
      return;
    }
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? { ...p, ...form } : p));
      toast({ title: "Product Updated", description: `${form.name} has been updated.` });
    } else {
      setProducts((prev) => [...prev, { id: Date.now().toString(), ...form }]);
      toast({ title: "Product Added", description: `${form.name} has been added.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast({ title: "Product Deleted", description: `${deleteTarget.name} has been removed.` });
    setDeleteTarget(null);
    if (paginatedProducts.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleExport = () => {
    const headers = ["Name", "Description", "Price", "COGS", "Stock", "Category", "Active"];
    const rows = products.map((p) => [p.name, p.description, p.price, p.costOfGoods, p.stock, p.category, p.isActive]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "products.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Product data exported as CSV." });
  };

  const updateForm = (field: string, value: string | number | boolean) => setForm((prev) => ({ ...prev, [field]: value }));

  const formatCurrency = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "styling": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "beard care": return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "treatment": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "hair care": return "bg-green-100 text-green-700 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Out of Stock</Badge>;
    if (stock <= 5) return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100"><AlertTriangle className="w-3 h-3 mr-1" />Low: {stock}</Badge>;
    return <span className="text-[hsl(var(--admin-card-foreground))]">{stock} units</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Products</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your product inventory</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2" onClick={openAdd}><Plus className="w-4 h-4" /> Add Product</Button>
        </div>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">All Products</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
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
                const margin = product.price > 0 ? ((product.price - product.costOfGoods) / product.price) * 100 : 0;
                return (
                  <TableRow key={product.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                    <TableCell>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{product.name}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{product.description}</p>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className={getCategoryStyle(product.category)}>{product.category}</Badge></TableCell>
                    <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">{formatCurrency(product.price)}</TableCell>
                    <TableCell className="text-[hsl(var(--admin-muted-foreground))]">{formatCurrency(product.costOfGoods)}</TableCell>
                    <TableCell><span className="text-green-600 font-medium">{margin.toFixed(0)}%</span></TableCell>
                    <TableCell>{getStockBadge(product.stock)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"><MoreHorizontal className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                          <DropdownMenuItem onClick={() => openEdit(product)} className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer"><Edit2 className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteTarget(product)} className="text-destructive hover:bg-destructive/10 cursor-pointer"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">{editingProduct ? "Update the product details below." : "Fill in the details for the new product."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Product Name</Label>
              <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Enter product name" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Description</Label>
              <Textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Describe the product..." className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Selling Price (IDR)</Label>
                <Input type="number" value={form.price} onChange={(e) => updateForm("price", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Cost of Goods (IDR)</Label>
                <Input type="number" value={form.costOfGoods} onChange={(e) => updateForm("costOfGoods", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Stock</Label>
                <Input type="number" value={form.stock} onChange={(e) => updateForm("stock", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Category</Label>
                <Input value={form.category} onChange={(e) => updateForm("category", e.target.value)} placeholder="e.g., Styling, Hair Care" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Active</Label>
              <Switch checked={form.isActive} onCheckedChange={(checked) => updateForm("isActive", checked)} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">Cancel</Button>
              <Button onClick={handleSave}>{editingProduct ? "Update Product" : "Save Product"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[hsl(var(--admin-muted-foreground))]">This action cannot be undone. This product will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
