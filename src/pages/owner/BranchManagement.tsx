import { useState } from "react";
import { Building2, Plus, Edit2, Trash2, Clock, Armchair, Search, MoreHorizontal } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  chairs: number;
  status: "active" | "inactive";
}

const initialBranches: Branch[] = [
  { id: "1", name: "Central Branch", address: "Jl. Sudirman No. 123, Jakarta", phone: "+62 21 1234567", openTime: "09:00", closeTime: "21:00", chairs: 6, status: "active" },
  { id: "2", name: "West Branch", address: "Jl. Gatot Subroto No. 45, Jakarta", phone: "+62 21 7654321", openTime: "10:00", closeTime: "22:00", chairs: 4, status: "active" },
  { id: "3", name: "East Branch", address: "Jl. MT Haryono No. 78, Jakarta", phone: "+62 21 9876543", openTime: "09:00", closeTime: "20:00", chairs: 5, status: "active" },
  { id: "4", name: "South Branch", address: "Jl. Kemang Raya No. 90, Jakarta", phone: "+62 21 1122334", openTime: "10:00", closeTime: "21:00", chairs: 4, status: "inactive" },
  { id: "5", name: "North Branch", address: "Jl. Kelapa Gading No. 55, Jakarta", phone: "+62 21 5566778", openTime: "09:00", closeTime: "21:00", chairs: 5, status: "active" },
  { id: "6", name: "BSD Branch", address: "BSD City Blok A1 No. 12, Tangerang", phone: "+62 21 8899001", openTime: "10:00", closeTime: "22:00", chairs: 6, status: "active" },
];

const emptyForm: { name: string; address: string; phone: string; openTime: string; closeTime: string; chairs: number; status: "active" | "inactive" } = { name: "", address: "", phone: "", openTime: "09:00", closeTime: "21:00", chairs: 4, status: "active" };

const ITEMS_PER_PAGE = 5;

export default function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Branch | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);
  const paginatedBranches = filteredBranches.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openAdd = () => {
    setEditingBranch(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setForm({ name: branch.name, address: branch.address, phone: branch.phone, openTime: branch.openTime, closeTime: branch.closeTime, chairs: branch.chairs, status: branch.status as "active" | "inactive" });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.address.trim()) {
      toast({ title: "Validation Error", description: "Name and address are required.", variant: "destructive" });
      return;
    }
    if (editingBranch) {
      setBranches((prev) => prev.map((b) => b.id === editingBranch.id ? { ...b, ...form } : b));
      toast({ title: "Branch Updated", description: `${form.name} has been updated.` });
    } else {
      const newBranch: Branch = { id: Date.now().toString(), ...form };
      setBranches((prev) => [...prev, newBranch]);
      toast({ title: "Branch Added", description: `${form.name} has been added.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setBranches((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    toast({ title: "Branch Deleted", description: `${deleteTarget.name} has been removed.` });
    setDeleteTarget(null);
    if (paginatedBranches.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const updateForm = (field: string, value: string | number) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Branch Management</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your barbershop branches</p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" />
          Add Branch
        </Button>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">All Branches</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Contact</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Hours</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Chairs</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBranches.map((branch) => (
                <TableRow key={branch.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{branch.name}</p>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{branch.address}</p>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{branch.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Clock className="w-3 h-3" />
                      {branch.openTime} - {branch.closeTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Armchair className="w-3 h-3" />
                      {branch.chairs}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={branch.status === "active" ? "default" : "secondary"}
                      className={branch.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}
                    >
                      {branch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <DropdownMenuItem onClick={() => openEdit(branch)} className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer">
                          <Edit2 className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteTarget(branch)} className="text-destructive hover:bg-destructive/10 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
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
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
              {editingBranch ? "Edit Branch" : "Add New Branch"}
            </DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">
              {editingBranch ? "Update the branch details below." : "Fill in the details for the new branch."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Branch Name</Label>
              <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Enter branch name" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Address</Label>
              <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Enter full address" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                <Input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+62 xxx" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Barber Chairs</Label>
                <Input type="number" value={form.chairs} onChange={(e) => updateForm("chairs", parseInt(e.target.value) || 0)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Opening Time</Label>
                <Input type="time" value={form.openTime} onChange={(e) => updateForm("openTime", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Closing Time</Label>
                <Input type="time" value={form.closeTime} onChange={(e) => updateForm("closeTime", e.target.value)} className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Active Status</Label>
              <Switch checked={form.status === "active"} onCheckedChange={(checked) => updateForm("status", checked ? "active" : "inactive")} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
                Cancel
              </Button>
              <Button onClick={handleSave}>{editingBranch ? "Update Branch" : "Save Branch"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[hsl(var(--admin-muted-foreground))]">
              This action cannot be undone. This branch and all its data will be permanently removed.
            </AlertDialogDescription>
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
