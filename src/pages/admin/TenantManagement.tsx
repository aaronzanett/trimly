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
];

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

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Tenant Management</h1>
        <p className="text-muted-foreground mt-1">Manage all barbershop tenants on the platform</p>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Tenant List ({filteredTenants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Tenant</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Plan</TableHead>
                <TableHead className="text-muted-foreground">Branches</TableHead>
                <TableHead className="text-muted-foreground">Users</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{tenant.name}</p>
                      <p className="text-xs text-muted-foreground">{tenant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell className="text-foreground">{tenant.plan}</TableCell>
                  <TableCell className="text-foreground">{tenant.branches}</TableCell>
                  <TableCell className="text-foreground">{tenant.users}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTenant(tenant)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tenant Details Dialog */}
      <Dialog open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{selectedTenant?.name}</DialogTitle>
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
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <GitBranch className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Branches</p>
                    <p className="text-lg font-semibold text-foreground">{selectedTenant.branches}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Users</p>
                    <p className="text-lg font-semibold text-foreground">{selectedTenant.users}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Subscription Period</p>
                    <p className="text-sm text-foreground">
                      {selectedTenant.subscriptionStart} — {selectedTenant.subscriptionEnd}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Contact Email</p>
                <p className="text-sm text-foreground">{selectedTenant.email}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
