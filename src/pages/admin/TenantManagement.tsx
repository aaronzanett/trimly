import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import { Search, Eye, Building2, Users, GitBranch, Calendar } from "lucide-react";
import { AdminPagination } from "@/components/admin/AdminPagination";

type TenantStatus = "active" | "trial" | "suspended";

interface Tenant {
  id: string;
  name: string;
  email: string;
  status: TenantStatus;
  plan: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  branches: number;
  users: number;
}

const tenants: Tenant[] = [
  {
    id: "1",
    name: "Elite Cuts Barbershop",
    email: "owner@elitecuts.com",
    status: "active",
    plan: "Professional",
    subscriptionStart: "2024-01-15",
    subscriptionEnd: "2025-01-15",
    branches: 3,
    users: 12,
  },
  {
    id: "2",
    name: "Urban Style Studio",
    email: "contact@urbanstyle.com",
    status: "active",
    plan: "Enterprise",
    subscriptionStart: "2024-03-01",
    subscriptionEnd: "2025-03-01",
    branches: 8,
    users: 35,
  },
  {
    id: "3",
    name: "Classic Barbers",
    email: "info@classicbarbers.com",
    status: "trial",
    plan: "Starter",
    subscriptionStart: "2024-12-01",
    subscriptionEnd: "2024-12-14",
    branches: 1,
    users: 3,
  },
  {
    id: "4",
    name: "The Gentleman's Corner",
    email: "hello@gentlemanscorner.com",
    status: "suspended",
    plan: "Professional",
    subscriptionStart: "2024-06-01",
    subscriptionEnd: "2024-12-01",
    branches: 2,
    users: 8,
  },
  {
    id: "5",
    name: "Fresh Fades Lounge",
    email: "book@freshfades.com",
    status: "active",
    plan: "Starter",
    subscriptionStart: "2024-09-15",
    subscriptionEnd: "2025-09-15",
    branches: 1,
    users: 4,
  },
  {
    id: "6",
    name: "Royal Cuts",
    email: "info@royalcuts.com",
    status: "active",
    plan: "Professional",
    subscriptionStart: "2024-02-01",
    subscriptionEnd: "2025-02-01",
    branches: 4,
    users: 15,
  },
  {
    id: "7",
    name: "Modern Man Grooming",
    email: "contact@modernman.com",
    status: "trial",
    plan: "Starter",
    subscriptionStart: "2024-12-10",
    subscriptionEnd: "2024-12-24",
    branches: 1,
    users: 2,
  },
];

const ITEMS_PER_PAGE = 5;

const getStatusBadge = (status: TenantStatus) => {
  const variants: Record<TenantStatus, { variant: "default" | "secondary" | "destructive"; label: string }> = {
    active: { variant: "default", label: "Active" },
    trial: { variant: "secondary", label: "Trial" },
    suspended: { variant: "destructive", label: "Suspended" },
  };
  const { variant, label } = variants[status];
  return <Badge variant={variant}>{label}</Badge>;
};

export default function TenantManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTenants.length / ITEMS_PER_PAGE);
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Tenant Management</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Manage all barbershop tenants on the platform</p>
      </div>

      {/* Search */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
            <Input
              placeholder="Search tenants by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
            <Building2 className="w-5 h-5 text-primary" />
            Tenant List ({filteredTenants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Tenant</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Plan</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branches</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Users</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTenants.map((tenant) => (
                <TableRow key={tenant.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{tenant.name}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">{tenant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{tenant.plan}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{tenant.branches}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{tenant.users}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTenant(tenant)}
                      className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
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

      {/* Tenant Details Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">{selectedTenant?.name}</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedTenant.status)}
                <Badge variant="outline" className="border-primary text-primary">
                  {selectedTenant.plan}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--admin-muted))]">
                  <GitBranch className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Branches</p>
                    <p className="text-lg font-semibold text-[hsl(var(--admin-card-foreground))]">{selectedTenant.branches}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--admin-muted))]">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Users</p>
                    <p className="text-lg font-semibold text-[hsl(var(--admin-card-foreground))]">{selectedTenant.users}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--admin-muted))]">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Subscription Period</p>
                    <p className="text-sm text-[hsl(var(--admin-card-foreground))]">
                      {selectedTenant.subscriptionStart} — {selectedTenant.subscriptionEnd}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[hsl(var(--admin-border))]">
                <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Contact Email</p>
                <p className="text-sm text-[hsl(var(--admin-card-foreground))]">{selectedTenant.email}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
