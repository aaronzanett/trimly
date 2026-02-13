import { useState } from "react";
import { Plus, Edit2, Trash2, Search, MoreHorizontal, Clock, Download } from "lucide-react";
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

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

const initialServices: Service[] = [
  { id: "1", name: "Regular Haircut", description: "Classic haircut with styling", price: 50000, duration: 30, category: "Haircut", isActive: true },
  { id: "2", name: "Premium Haircut", description: "Premium cut with hot towel and styling", price: 85000, duration: 45, category: "Haircut", isActive: true },
  { id: "3", name: "Kids Haircut", description: "Haircut for children under 12", price: 40000, duration: 25, category: "Haircut", isActive: true },
  { id: "4", name: "Beard Trim", description: "Beard shaping and trimming", price: 35000, duration: 20, category: "Grooming", isActive: true },
  { id: "5", name: "Full Shave", description: "Traditional hot towel shave", price: 45000, duration: 30, category: "Grooming", isActive: true },
  { id: "6", name: "Hair Coloring", description: "Single color application", price: 150000, duration: 90, category: "Color", isActive: true },
  { id: "7", name: "Hair Treatment", description: "Deep conditioning treatment", price: 120000, duration: 45, category: "Treatment", isActive: false },
  { id: "8", name: "Head Massage", description: "Relaxing scalp massage", price: 50000, duration: 20, category: "Treatment", isActive: true },
];

type ServiceForm = { name: string; description: string; price: number; duration: number; category: string; isActive: boolean };
const emptyForm: ServiceForm = { name: "", description: "", price: 0, duration: 30, category: "", isActive: true };

const ITEMS_PER_PAGE = 5;

export default function Services() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const { toast } = useToast();

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openAdd = () => { setEditingService(null); setForm(emptyForm); setIsDialogOpen(true); };
  const openEdit = (s: Service) => {
    setEditingService(s);
    setForm({ name: s.name, description: s.description, price: s.price, duration: s.duration, category: s.category, isActive: s.isActive });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.category.trim()) {
      toast({ title: "Validation Error", description: "Name and category are required.", variant: "destructive" });
      return;
    }
    if (editingService) {
      setServices((prev) => prev.map((s) => s.id === editingService.id ? { ...s, ...form } : s));
      toast({ title: "Service Updated", description: `${form.name} has been updated.` });
    } else {
      setServices((prev) => [...prev, { id: Date.now().toString(), ...form }]);
      toast({ title: "Service Added", description: `${form.name} has been added.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    toast({ title: "Service Deleted", description: `${deleteTarget.name} has been removed.` });
    setDeleteTarget(null);
    if (paginatedServices.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleExport = () => {
    const headers = ["Name", "Description", "Price", "Duration", "Category", "Active"];
    const rows = services.map((s) => [s.name, s.description, s.price, s.duration, s.category, s.isActive]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "services.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Service data exported as CSV." });
  };

  const updateForm = (field: string, value: string | number | boolean) => setForm((prev) => ({ ...prev, [field]: value }));

  const formatCurrency = (amount: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "haircut": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "grooming": return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "color": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "treatment": return "bg-green-100 text-green-700 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Services</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your barbershop services</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2" onClick={openAdd}><Plus className="w-4 h-4" /> Add Service</Button>
        </div>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">All Services</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input placeholder="Search services..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Service</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Category</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Price</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Duration</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedServices.map((service) => (
                <TableRow key={service.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{service.name}</p>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{service.description}</p>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className={getCategoryStyle(service.category)}>{service.category}</Badge></TableCell>
                  <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">{formatCurrency(service.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]"><Clock className="w-3 h-3" />{service.duration} min</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.isActive ? "default" : "secondary"} className={service.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}>{service.isActive ? "Active" : "Inactive"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <DropdownMenuItem onClick={() => openEdit(service)} className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer"><Edit2 className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteTarget(service)} className="text-destructive hover:bg-destructive/10 cursor-pointer"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">{editingService ? "Update the service details below." : "Fill in the details for the new service."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Service Name</Label>
              <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Enter service name" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Description</Label>
              <Textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Describe the service..." className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Price (IDR)</Label>
                <Input type="number" value={form.price} onChange={(e) => updateForm("price", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Duration (minutes)</Label>
                <Input type="number" value={form.duration} onChange={(e) => updateForm("duration", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Category</Label>
              <Input value={form.category} onChange={(e) => updateForm("category", e.target.value)} placeholder="e.g., Haircut, Grooming" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Active</Label>
              <Switch checked={form.isActive} onCheckedChange={(checked) => updateForm("isActive", checked)} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">Cancel</Button>
              <Button onClick={handleSave}>{editingService ? "Update Service" : "Save Service"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[hsl(var(--admin-muted-foreground))]">This action cannot be undone. This service will be permanently removed.</AlertDialogDescription>
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
