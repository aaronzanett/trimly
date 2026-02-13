import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Search, MoreHorizontal, KeyRound, Building2, Download } from "lucide-react";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "barber" | "cashier" | "manager";
  branch: string;
  status: "active" | "inactive";
  joinDate: string;
}

const initialEmployees: Employee[] = [
  { id: "1", name: "Ahmad Fauzi", email: "ahmad@trimly.com", phone: "+62 812 1234567", role: "barber", branch: "Central Branch", status: "active", joinDate: "2023-06-15" },
  { id: "2", name: "Budi Santoso", email: "budi@trimly.com", phone: "+62 813 2345678", role: "barber", branch: "West Branch", status: "active", joinDate: "2023-08-20" },
  { id: "3", name: "Candra Wijaya", email: "candra@trimly.com", phone: "+62 814 3456789", role: "barber", branch: "Central Branch", status: "active", joinDate: "2023-05-10" },
  { id: "4", name: "Dewi Lestari", email: "dewi@trimly.com", phone: "+62 815 4567890", role: "cashier", branch: "Central Branch", status: "active", joinDate: "2023-07-01" },
  { id: "5", name: "Eko Prasetyo", email: "eko@trimly.com", phone: "+62 816 5678901", role: "manager", branch: "West Branch", status: "active", joinDate: "2023-03-15" },
  { id: "6", name: "Fitri Handayani", email: "fitri@trimly.com", phone: "+62 817 6789012", role: "cashier", branch: "East Branch", status: "inactive", joinDate: "2023-09-01" },
  { id: "7", name: "Gita Permata", email: "gita@trimly.com", phone: "+62 818 7890123", role: "barber", branch: "East Branch", status: "active", joinDate: "2024-01-10" },
];

type EmployeeForm = { name: string; email: string; phone: string; role: "barber" | "cashier" | "manager"; branch: string; status: "active" | "inactive" };
const emptyForm: EmployeeForm = { name: "", email: "", phone: "", role: "barber", branch: "Central Branch", status: "active" };

const ITEMS_PER_PAGE = 5;

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [form, setForm] = useState<EmployeeForm>(emptyForm);
  const { toast } = useToast();

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const openAdd = () => { setEditingEmployee(null); setForm(emptyForm); setIsDialogOpen(true); };
  const openEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm({ name: emp.name, email: emp.email, phone: emp.phone, role: emp.role, branch: emp.branch, status: emp.status });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Validation Error", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    if (editingEmployee) {
      setEmployees((prev) => prev.map((e) => e.id === editingEmployee.id ? { ...e, ...form } : e));
      toast({ title: "Employee Updated", description: `${form.name} has been updated.` });
    } else {
      const newEmp: Employee = { id: Date.now().toString(), ...form, joinDate: new Date().toISOString().split("T")[0] };
      setEmployees((prev) => [...prev, newEmp]);
      toast({ title: "Employee Added", description: `${form.name} has been added.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setEmployees((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    toast({ title: "Employee Deleted", description: `${deleteTarget.name} has been removed.` });
    setDeleteTarget(null);
    if (paginatedEmployees.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleResetPassword = (emp: Employee) => {
    toast({ title: "Password Reset", description: `Password reset link sent to ${emp.email}.` });
  };

  const handleExport = () => {
    const headers = ["Name", "Email", "Phone", "Role", "Branch", "Status", "Join Date"];
    const rows = employees.map((e) => [e.name, e.email, e.phone, e.role, e.branch, e.status, e.joinDate]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "employees.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Employee data exported as CSV." });
  };

  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "manager": return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "barber": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "cashier": return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Employee Management</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your team across all branches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2" onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Employee
          </Button>
        </div>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">All Employees</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input placeholder="Search employees..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Employee</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Role</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Join Date</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{employee.name}</p>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{employee.email}</p>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className={getRoleBadgeStyle(employee.role)}>{employee.role}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Building2 className="w-3 h-3" />{employee.branch}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "active" ? "default" : "secondary"} className={employee.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}>{employee.status}</Badge>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{new Date(employee.joinDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                        <DropdownMenuItem onClick={() => openEdit(employee)} className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer"><Edit2 className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(employee)} className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer"><KeyRound className="w-4 h-4 mr-2" />Reset Password</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteTarget(employee)} className="text-destructive hover:bg-destructive/10 cursor-pointer"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
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
            <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
            <DialogDescription className="text-[hsl(var(--admin-muted-foreground))]">{editingEmployee ? "Update the employee details below." : "Fill in the details for the new employee."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Full Name</Label>
                <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Enter full name" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="email@example.com" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                <Input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+62 xxx" className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Role</Label>
                <Select value={form.role} onValueChange={(v) => updateForm("role", v)}>
                  <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                    <SelectItem value="barber">Barber</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Assign to Branch</Label>
              <Select value={form.branch} onValueChange={(v) => updateForm("branch", v)}>
                <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                  <SelectItem value="Central Branch">Central Branch</SelectItem>
                  <SelectItem value="West Branch">West Branch</SelectItem>
                  <SelectItem value="East Branch">East Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Active Status</Label>
              <Switch checked={form.status === "active"} onCheckedChange={(checked) => updateForm("status", checked ? "active" : "inactive")} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">Cancel</Button>
              <Button onClick={handleSave}>{editingEmployee ? "Update Employee" : "Save Employee"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription className="text-[hsl(var(--admin-muted-foreground))]">This action cannot be undone. This employee will be permanently removed.</AlertDialogDescription>
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
