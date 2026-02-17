import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Plus, Pencil, Trash2, MessageCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminPagination } from "@/components/admin/AdminPagination";

type UserRole = "super_admin" | "finance" | "support";

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  finance: "Finance",
  support: "Support",
};

const getRoleBadgeStyle = (role: UserRole) => {
  switch (role) {
    case "super_admin":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";
    case "finance":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "support":
      return "bg-green-100 text-green-700 hover:bg-green-100";
  }
};

const initialUsers: PlatformUser[] = [
  { id: "1", name: "Adi Nugroho", email: "adi.nugroho@trimly.com", phone: "+6281234567890", role: "super_admin", createdAt: "2024-01-10" },
  { id: "2", name: "Sari Wulandari", email: "sari.w@trimly.com", phone: "+6281987654321", role: "finance", createdAt: "2024-02-15" },
  { id: "3", name: "Rizki Pratama", email: "rizki.p@trimly.com", phone: "+6281122334455", role: "support", createdAt: "2024-03-20" },
  { id: "4", name: "Putri Rahayu", email: "putri.r@trimly.com", phone: "+6281555666777", role: "finance", createdAt: "2024-04-05" },
  { id: "5", name: "Hendra Wijaya", email: "hendra.w@trimly.com", phone: "+6281888999000", role: "support", createdAt: "2024-05-12" },
  { id: "6", name: "Lina Kusuma", email: "lina.k@trimly.com", phone: "+6281444555666", role: "super_admin", createdAt: "2024-06-18" },
];

const ITEMS_PER_PAGE = 5;

export default function PlatformUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PlatformUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "support" as UserRole,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openCreateDialog = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", password: "", role: "support" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: PlatformUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({ title: "Error", description: "Name and email are required", variant: "destructive" });
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      toast({ title: "Error", description: "Password is required for new users", variant: "destructive" });
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: formData.name, email: formData.email, phone: formData.phone, role: formData.role }
            : u
        )
      );
      toast({ title: "Success", description: "User updated successfully" });
    } else {
      const newUser: PlatformUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
      toast({ title: "Success", description: "User created successfully" });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({ title: "Success", description: "User deleted successfully" });
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Platform Users</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Manage platform administrator accounts</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
            <Users className="w-5 h-5 text-primary" />
            Platform Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Name</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Email</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Role</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Phone</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Created</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">{user.name}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getRoleBadgeStyle(user.role)}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{user.phone}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-muted-foreground))]">{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openWhatsApp(user.phone)}
                        className="text-green-600 hover:text-green-500 hover:bg-green-500/10"
                        title="Open WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(user)}
                        className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="text-[hsl(var(--admin-muted-foreground))] hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[hsl(var(--admin-card-foreground))]">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
                placeholder="Adi Nugroho"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[hsl(var(--admin-card-foreground))]">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
                placeholder="adi@trimly.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[hsl(var(--admin-card-foreground))]">Phone (with country code)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
                  placeholder="+6281234567890"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[hsl(var(--admin-card-foreground))]">
                Password {editingUser && <span className="text-[hsl(var(--admin-muted-foreground))]">(leave blank to keep current)</span>}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
