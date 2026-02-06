import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Search, MoreHorizontal, KeyRound, Building2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";

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

const mockEmployees: Employee[] = [
  { id: "1", name: "Ahmad Fauzi", email: "ahmad@trimly.com", phone: "+62 812 1234567", role: "barber", branch: "Central Branch", status: "active", joinDate: "2023-06-15" },
  { id: "2", name: "Budi Santoso", email: "budi@trimly.com", phone: "+62 813 2345678", role: "barber", branch: "West Branch", status: "active", joinDate: "2023-08-20" },
  { id: "3", name: "Candra Wijaya", email: "candra@trimly.com", phone: "+62 814 3456789", role: "barber", branch: "Central Branch", status: "active", joinDate: "2023-05-10" },
  { id: "4", name: "Dewi Lestari", email: "dewi@trimly.com", phone: "+62 815 4567890", role: "cashier", branch: "Central Branch", status: "active", joinDate: "2023-07-01" },
  { id: "5", name: "Eko Prasetyo", email: "eko@trimly.com", phone: "+62 816 5678901", role: "manager", branch: "West Branch", status: "active", joinDate: "2023-03-15" },
  { id: "6", name: "Fitri Handayani", email: "fitri@trimly.com", phone: "+62 817 6789012", role: "cashier", branch: "East Branch", status: "inactive", joinDate: "2023-09-01" },
  { id: "7", name: "Gita Permata", email: "gita@trimly.com", phone: "+62 818 7890123", role: "barber", branch: "East Branch", status: "active", joinDate: "2024-01-10" },
];

const ITEMS_PER_PAGE = 5;

export default function EmployeeManagement() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "manager":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "barber":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "cashier":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Employee Management
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Manage your team across all branches
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <DialogHeader>
              <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                Add New Employee
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Full Name</Label>
                  <Input
                    placeholder="Enter full name"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Email</Label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                  <Input
                    placeholder="+62 xxx"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Role</Label>
                  <Select>
                    <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
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
                <Select>
                  <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                    <SelectItem value="central">Central Branch</SelectItem>
                    <SelectItem value="west">West Branch</SelectItem>
                    <SelectItem value="east">East Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Active Status</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save Employee</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
              All Employees
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search employees..."
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
                <TableRow
                  key={employee.id}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">
                        {employee.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                        {employee.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getRoleBadgeStyle(employee.role)}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Building2 className="w-3 h-3" />
                      {employee.branch}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className={
                        employee.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {new Date(employee.joinDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
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
                        <DropdownMenuItem className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer">
                          <KeyRound className="w-4 h-4 mr-2" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
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
